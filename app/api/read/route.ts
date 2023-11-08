import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { queryPineconeVectoreStoreAndQueryLLM } from "../../../utils";
import { indexName } from "../../../config";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const client = new Pinecone({
		apiKey: process.env.PINECONE_API_KEY || "",
		environment: "gcp-starter" || ""
	});

	const text = await queryPineconeVectoreStoreAndQueryLLM(
		client,
		indexName,
		body
	);
	return NextResponse.json({
		data: text
	});
}