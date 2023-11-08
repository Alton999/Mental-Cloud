import React from "react";
import { TechniqueQueryResultProps } from "../types";

const TechniqueQueryResult = ({
	techniqueQueryResult
}: TechniqueQueryResultProps) => {
	const definition = (techniqueQueryResult as TechniqueQueryResultProps)
		.definition;
	const steps = (techniqueQueryResult as TechniqueQueryResultProps).steps;
	const benefit = (techniqueQueryResult as TechniqueQueryResultProps).benefit;

	return (
		<div className="space-y-3">
			<p>{definition}</p>
			<div className="space-y-1">
				<h5 className="font-semibold">Steps:</h5>
				<ul className="space-y-2 list-decimal ml-6">
					{steps.map((step: string, index: number) => (
						<li key={index}>{step}</li>
					))}
				</ul>
			</div>
			<p>{benefit}</p>
		</div>
	);
};

export default TechniqueQueryResult;
