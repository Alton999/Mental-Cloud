import { MouseEventHandler } from "react";

export interface ToggleConditionProps {
	condition: string;
	selectedCondition: string;
	handleToggle?: MouseEventHandler<HTMLButtonElement>;
}

export interface ResultsOutputProps {
	results: object;
	healthStatement?: string;
}

export interface WeekOutputProps {
	// value: object;
	index: number;
	healthSummary?: string;
	strategies: string;
	weekTitle: string;
	techniques: Array<string>;
}

export interface TechniqueCardProps {
	technique: string;
	strategies: string;
	healthSummary?: string;
}

export interface TechniqueQueryResultProps {
	// techniqueQueryResult: object;
	definition: string;
	steps: Array<string>;
	benefit: string;
}

export interface ConditionInputProps {
	selectedCondition: string;
	setSelectedCondition: React.Dispatch<React.SetStateAction<string>>;
}

export interface DescriptionInputProps {
	description: string;
	setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export interface GoalsInputProps {
	goals: string;
	setGoals: React.Dispatch<React.SetStateAction<string>>;
}

export interface TextInputProps {
	handleChange: React.Dispatch<React.SetStateAction<string>>;
	name: string;
}
