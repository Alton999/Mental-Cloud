import React from "react";
import { GoalsInputProps } from "../../types";
import { TextInput } from "..";

const GoalsInput = ({ goals, setGoals }: GoalsInputProps) => {
	return (
		<div className="space-y-3">
			<label htmlFor="goals" className="font-semibold text-lg">
				What do you want to get out of this health plan? Give a short sentence
				describing your situation.
			</label>
			<TextInput name="goals" handleChange={setGoals} />
		</div>
	);
};

export default GoalsInput;
