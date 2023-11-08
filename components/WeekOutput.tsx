import { WeekOutputProps } from "../types";
import { TechniqueCard } from ".";

const WeekOutput = ({ value, index, healthSummary }: WeekOutputProps) => {
	// const [healthSummary, setHealthSummary] = useState("");
	// const healthStatement = (results as ResultsOutputProps).healthStatement;

	const strategies = (value as WeekOutputProps).strategies;
	const weekTitle = (value as WeekOutputProps).weekTitle;
	const techniques = (value as WeekOutputProps).techniques;
	console.log(value);
	return (
		<div
			className={`space-y-3 px-6 py-4 border-2 border-sky-800 
              rounded-xl `}
		>
			<h3 className="font-bold text-xl">
				Week {index}: {weekTitle}
			</h3>

			<p className="text-lg"> {strategies}</p>
			<ul className="text-lg flex flex-col w-full gap-8  py-4">
				{techniques.map((technique: string, index: number) => (
					<TechniqueCard
						key={index}
						technique={technique}
						strategies={strategies}
						healthSummary={healthSummary}
					/>
				))}
			</ul>
		</div>
	);
};

export default WeekOutput;
