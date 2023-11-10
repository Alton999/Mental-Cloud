"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import {
	ToggleCondition,
	ResultsOutput,
	ConditionInput,
	DescriptionInput,
	GoalsInput
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

			console.log(result);
			// setResult();
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	return (
		<section>
			<div>
				<div className="py-6 w-full space-y-8">
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
			</div>
			<button
				className="px-7 py-1 bg-white text-black mt-2 mb-2"
				onClick={sendQuery}
			>
				{loading ? <p>Asking AI...</p> : <p>Generate</p>}
			</button>
			<div>{result && <ResultsOutput results={result} />}</div>
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
