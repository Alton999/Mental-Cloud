import React from "react";
import { TechniqueQueryResultProps } from "../types";

const TechniqueQueryResult = ({
	techniqueQueryResult
}: TechniqueQueryResultProps) => {
	return (
		<div className="space-y-3">
			<p>{techniqueQueryResult.definition}</p>
			<div className="space-y-1">
				<h5 className="font-semibold">Steps:</h5>
				<ul className="space-y-2 list-decimal ml-6">
					{techniqueQueryResult.steps.map((step: string, index: number) => (
						<li key={index}>{step}</li>
					))}
				</ul>
			</div>
			<p>{techniqueQueryResult.benefit}</p>
		</div>
	);
};

export default TechniqueQueryResult;
