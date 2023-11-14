"use client";
import { useState } from "react";
import {
	ResultsOutput,
	ConditionInput,
	DescriptionInput,
	GoalsInput,
	Button,
	LoaderBig
} from ".";

const AiQuery = () => {
	const [description, setDescription] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedCondition, setSelectedCondition] = useState("");
	const [goals, setGoals] = useState("");

	async function createIndexAndEmbeddings() {
		try {
			const result = await fetch("/api/setup", {
				method: "POST"
			});
			const data = await result.json();
			console.log("results", data);
		} catch (err) {
			console.log("Err:", err);
		}
	}

	async function sendQuery() {
		if (!description || !selectedCondition) return;
		setResult(null);
		setLoading(true);
		try {
			const result = await fetch("/api/read", {
				method: "POST",
				body: JSON.stringify({ description, selectedCondition, goals })
			});
			const json = await result.json();
			setResult(
				JSON.parse(
					JSON.parse(JSON.stringify(json)).data.replace(/(\r\n|\n|\r)/gm, "")
				)
			);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}
	return (
		<section className="lg:w-[1080px]">
			{loading ? (
				<LoaderBig />
			) : (
				<div>
					{result ? (
						<ResultsOutput results={result} />
					) : (
						<section className="py-6 w-full space-y-8">
							<h1 className="text-4xl font-bold text-center">
								Welcome to Mental Cloud.
							</h1>
							<p className="text-xl font-semibold">
								We welcome you to curate your very first mental healthcare plan
								backed by research to start your week with your head in the
								clouds.
							</p>
							<div className="space-y-10">
								<ConditionInput
									selectedCondition={selectedCondition}
									setSelectedCondition={setSelectedCondition}
								/>
								<DescriptionInput
									description={description}
									setDescription={setDescription}
								/>
								<GoalsInput goals={goals} setGoals={setGoals} />
							</div>
							<div className="flex justify-between">
								<Button text="Generate" primary handleClick={sendQuery} />
							</div>
						</section>
					)}
				</div>
			)}

			<button
				className="px-7 py-1 bg-white text-black mt-2 mb-2"
				onClick={createIndexAndEmbeddings}
			>
				Create index and embeddings
			</button>
		</section>
	);
};

export default AiQuery;
