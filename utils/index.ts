import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { loadQAMapReduceChain } from "langchain/chains";
import { Document } from "langchain/document";
import { timeout } from "../config";

export const createPineconeIndex = async (
	client: any,
	indexName: any,
	vectorDimension: any
) => {
	console.log(`Creating index ${indexName}...`);
	const existingIndexes = await client.listIndexes();
	if (!existingIndexes.includes(indexName)) {
		await client.createIndex({
			name: indexName,
			dimension: vectorDimension,
			metric: "cosine"
		});
		console.log(`Creating index... please wait for it to finish initialising.`);
		await new Promise((resolve) => setTimeout(resolve, timeout));
	} else {
		console.log(`Index ${indexName} already exists.`);
	}
};

export const updatePinecone = async (
	client: any,
	indexName: any,
	documents: any
) => {
	const index = client.Index(indexName);
	console.log(`Pinecone index retrieved: ${indexName}`);
	for (const doc of documents) {
		console.log(`Processing documents: ${doc.metadata.source}`);
		const txtPath = doc.metadata.source;
		const text = doc.pageContent;
		const textSplitter = new RecursiveCharacterTextSplitter({
			chunkSize: 1000
		});

		console.log(`Splitting text into chunks...`);
		const chunks = await textSplitter.createDocuments([text]);
		console.log(`Text split into ${chunks.length} chunks`);
		console.log(
			`Calling OpenAI's embedding endpoint documents with ${chunks.length} text chunks...`
		);
		const embeddingArrays = await new OpenAIEmbeddings().embedDocuments(
			chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
		);
		console.log(
			`Creating ${chunks.length} vectors array with id, values and metadata...`
		);
		const batchSize = 100;
		let batch: any = [];
		for (let idx = 0; idx < chunks.length; idx++) {
			const chunk = chunks[idx];
			const vector = {
				id: `${txtPath}-${idx}`,
				values: embeddingArrays[idx],
				metadata: {
					...chunk.metadata,
					loc: JSON.stringify(chunk.metadata.loc),
					pageContent: chunk.pageContent,
					txtPath: txtPath
				}
			};
			batch = [...batch, vector];
			if (batch.length === batchSize || idx === chunks.length - 1) {
				await index.upsert(batch);
				// Empty the batch
				batch = [];
			}
		}
	}
};

export const queryPineconeVectoreStoreAndQueryLLM = async (
	client: any,
	indexName: any,
	body: any
) => {
	const customPrompt = `User is having trouble with mental health. The condition they are facing is ${body.selectedCondition}. This is how it has been affecting the user ${body.description}. The user's goals from this health plan is ${body.goals}`;
	console.log(`Querying Pinecone vector store for question: ${customPrompt}`);
	const index = client.index(indexName);
	const queryEmbedding = await new OpenAIEmbeddings().embedQuery(customPrompt);
	let queryResponse = await index.query({
		topK: 7,
		vector: queryEmbedding,
		includeMetadata: true,
		includeValues: true
	});
	console.log(`Found ${queryResponse.matches.length} matches...`);
	console.log(`Asking question: ${customPrompt}...`);
	if (queryResponse.matches.length) {
		const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo-16k" });
		const chain = loadQAMapReduceChain(llm);
		const promptTemplate = `
			Here is the user's response: ${customPrompt}
		
			Provide a roadmap of strategies (on a week-by-week basis) the patient can use to improve in regards to what is going on with them. Start off with something comfortable for the patient to begin with, then gradually provide more strategies for each week. Use the embedded context to provide an accurate response with the relevant strategies and diagnosis.
			
			The response needs to be in JSON format. The JSON format should contain the following: 
			
			healthStatement: A statement outlining what health services and which health professionals would be best suitable for the patient's needs. In this statement, define any scientific terminology that was mentioned.

			Create a healthcare plan for 5 weeks
			
			Maps for each week. In the maps, do not put in any words or phrases that are scientific or technical. There also cannot be a week that focuses on seeking professional help or professional support. Each week needs to contain the following::
			
			- weekTitle: Title summary for the week
			- strategies: A paragraph for strategies laid out in detail. Elaborate on the strategy/strategies in as much detail as possible. 
			- techniques: List some practical techniques listed in the resources that the patient can use to help them with their mental health. Give 3 techniques for each week. Just give the technique names, NO additional details are required for the techniques.

			Follow this example template:
			{
				"healthStatement": "",
				"week1": {
					"weekTitle": "",
					"strategies": "",
					"techniques": [
						"Technique1",
						"Technique2"
					]
				},
				"week2": {...}
				}
			}
   `;

		const concatenatedPageContent = queryResponse.matches
			.map((match: any) => match.metadata.pageContent)
			.join("\n");
		const result = await chain.call({
			input_documents: [new Document({ pageContent: concatenatedPageContent })],
			question: promptTemplate
		});
		console.log(`Answer: ${result.text}`);
		return result.text;
	} else {
		console.log(`Since there are no matches, GPT-3 will not be queried.`);
	}
};

export const queryTechniques = async (
	client: any,
	indexName: any,
	body: any
) => {
	const customPrompt = `
		Use this context for the explanations:
		Here is the health summary ${body.healthSummary} and here is the strategy for the week ${body.strategies}
		Provide a definition for the technique of ${body.selectedTechnique} along with practical steps the user can take to use this technique. 
	`;
	console.log(`Querying Pinecone vector store for question: ${customPrompt}`);
	const index = client.index(indexName);
	const queryEmbedding = await new OpenAIEmbeddings().embedQuery(customPrompt);
	let queryResponse = await index.query({
		topK: 4,
		vector: queryEmbedding,
		includeMetadata: true,
		includeValues: true
	});
	console.log(`Found ${queryResponse.matches.length} matches...`);
	console.log(`Asking question: ${customPrompt}...`);
	if (queryResponse.matches.length) {
		const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo-16k" });
		const chain = loadQAMapReduceChain(llm);
		const promptTemplate = `${customPrompt}
			Respond in JSON format, with the following fields: definition, 5 steps as a list of strings and a benefit of following this technique relating back to their condition from the health summary. No numbering in lists are required.

			Follow this template: 
			{
				"definition": "A definition of the technique",
				"steps": [
					"Step1",
					"Step2"
				],
				"benefit": "A benefit of following this technique relating it back to the user's condition"
			}
		`;
		const concatenatedPageContent = queryResponse.matches
			.map((match: any) => match.metadata.pageContent)
			.join("\n");
		const result = await chain.call({
			input_documents: [new Document({ pageContent: concatenatedPageContent })],
			question: promptTemplate
		});
		console.log(`Answer: ${result.text}`);
		return result.text;
	} else {
		console.log(`Since there are no matches, GPT-3 will not be queried.`);
	}
};
