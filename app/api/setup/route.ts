import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { createPineconeIndex, updatePinecone } from "../../../utils";
import { indexName } from "../../../config";

export async function POST() {
	const loader = new DirectoryLoader("./documents", {
		".txt": (path) => new TextLoader(path),
		".md": (path) => new TextLoader(path),
		".pdf": (path) => new PDFLoader(path)
	});
	const docs = await loader.load();

	const vectorDimensions = 1536;

	// if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ENVIRONMENT) {
	// 	throw new Error("Pinecone API key or environment not defined");
	// }

	const client = new Pinecone({
		apiKey: process.env.PINECONE_API_KEY || "",
		environment: "gcp-starter" || ""
	});

	try {
		await createPineconeIndex(client, indexName, vectorDimensions);
		await updatePinecone(client, indexName, docs);
	} catch (err) {
		console.log("Error: ", err);
	}
	return NextResponse.json({
		data: "Successfully created index and loaded data into pinecone."
	});
}
