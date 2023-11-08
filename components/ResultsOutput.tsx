import { ResultsOutputProps } from "../types";
import { WeekOutput } from ".";

const ResultsOutput = ({ results }: ResultsOutputProps) => {
	console.log(results);
	return (
		<section className="py-4 bg-white rounded-xl text-sky-900 px-4 space-y-8">
			<h1 className="text-2xl font-bold">
				Welcome to your mental healthcare plan
			</h1>
			<div className="space-y-3">
				<h3 className="font-bold text-xl">Health Summary:</h3>
				<p className="text-lg"> {results.healthStatement}</p>
			</div>
			{Object.entries(results).map(
				([key, value], index) =>
					key !== "healthStatement" && (
						<WeekOutput
							key={key}
							value={value}
							index={index}
							healthSummary={results.healthStatement}
						/>
					)
			)}
		</section>
	);
};

export default ResultsOutput;
