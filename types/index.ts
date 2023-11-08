import { MouseEventHandler } from "react";

export interface ToggleConditionProps {
	condition: string;
	selectedCondition: string;
	handleToggle?: MouseEventHandler<HTMLButtonElement>;
}

export interface ResultsOutputProps {
	results: object;
}

export interface WeekOutputProps {
	value: object;
	index: number;
	healthSummary: string;
}

export interface TechniqueCardProps {
	technique: string;
	strategies: string;
	healthSummary: string;
}

export interface TechniqueQueryResultProps {
	techniqueQueryResult: object;
}
