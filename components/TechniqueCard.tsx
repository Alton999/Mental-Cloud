"use client";

import { useState } from "react";
import { TechniqueCardProps } from "../types";
import { TechniqueQueryResult, Loading } from ".";

const TechniqueCard = ({
	technique,
	healthSummary,
	strategies
}: TechniqueCardProps) => {
	const [selectedTechnique, setSelectedTechnique] = useState("");
	const [techniqueQueryResult, setTechniqueQueryResult] = useState("");
	const [loading, setLoading] = useState(false);

	async function sendTechniquesQuery(technique: string) {
		setSelectedTechnique(technique);
		if (!selectedTechnique) return;
		setTechniqueQueryResult(``);
		setLoading(true);
		try {
			const result = await fetch("/api/query-technique", {
				method: "POST",
				body: JSON.stringify({ selectedTechnique, healthSummary, strategies })
			});
			console.log(result);
			const json = await result.json();
			console.log(JSON.stringify(json));
			setTechniqueQueryResult(
				JSON.parse(JSON.stringify(json)).data.replace(/(\r\n|\n|\r)/gm, "")
			);
			setSelectedTechnique("");
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	return (
		<li className="w-full px-4 py-4  rounded-xl  space-y-3 bg-indigo-400/30  shadow-lg shadow-indigo-500/30 flex justify-between flex-col border-4 border-indigo-700/40">
			<p className="font-bold text-xl">{technique}</p>

			{/* <Loading /> */}
			{techniqueQueryResult !== "" && (
				<div className="w-full">
					<TechniqueQueryResult
						techniqueQueryResult={JSON.parse(techniqueQueryResult)}
					/>
				</div>
			)}
			<div className="w-full flex justify-end">
				{loading ? (
					<Loading />
				) : (
					techniqueQueryResult === "" && (
						<button
							onClick={() => sendTechniquesQuery(technique)}
							className="cursor-pointer  bg-white shadow-lg shadow-white/20 px-4 py-2 font-bold rounded-lg text-indigo-500/80"
						>
							Learn more
						</button>
					)
				)}
			</div>
		</li>
	);
};

export default TechniqueCard;
