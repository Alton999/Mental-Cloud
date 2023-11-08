"use client";
import { useState } from "react";
import { ToggleCondition, ResultsOutput } from ".";

const AiQuery = () => {
	const [query, setQuery] = useState("");
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
		if (!query || !selectedCondition) return;
		setResult(null);
		setLoading(true);
		try {
			const result = await fetch("/api/read", {
				method: "POST",
				body: JSON.stringify({ query, selectedCondition, goals })
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
					<div className="space-y-3">
						<h2 className="text-lg font-semibold">
							Which one of these conditions best describes your situation?
						</h2>
						<div className="flex gap-12 flex-wrap">
							<ToggleCondition
								condition="Anxiety"
								selectedCondition={selectedCondition}
								handleToggle={() => setSelectedCondition("Anxiety")}
							/>
							<ToggleCondition
								condition="Depression"
								selectedCondition={selectedCondition}
								handleToggle={() => setSelectedCondition("Depression")}
							/>
							<ToggleCondition
								condition="Attention-hyperactivity disorder (ADHD)"
								selectedCondition={selectedCondition}
								handleToggle={() =>
									setSelectedCondition(
										"Attention-hyperactivity disorder (ADHD)"
									)
								}
							/>
							<ToggleCondition
								condition="Eating disorder"
								selectedCondition={selectedCondition}
								handleToggle={() => setSelectedCondition("Eating disorder")}
							/>
						</div>
					</div>
					<div className="space-y-3">
						<label htmlFor="query" className="font-semibold text-lg">
							How has this condition affected you? Give a short sentence
							describing your situation.
						</label>
						<input
							name="query"
							type="text"
							className="text-black px-2 py-1 w-full"
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
					<div className="space-y-3">
						<label htmlFor="goals" className="font-semibold text-lg">
							What do you want to get out of this health plan? Give a short
							sentence describing your situation.
						</label>
						<input
							name="goals"
							type="text"
							className="text-black px-2 py-1 w-full"
							onChange={(e) => setGoals(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<button
				className="px-7 py-1 bg-white text-black mt-2 mb-2"
				onClick={sendQuery}
			>
				{loading ? <p>Asking AI...</p> : <p>Generate</p>}
			</button>
			{/* <div>{result && result.healthStatement}</div> */}
			{/* {result && <div>Result: {}</div>} */}
			<div>
				{result && <ResultsOutput results={result} />}
				{/* <ResultsOutput results={JSON.parse(testingOutput)} /> */}
			</div>
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
