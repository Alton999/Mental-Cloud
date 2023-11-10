import { ToggleCondition } from "../";
import { conditionInputs } from "../../constants";
import { ConditionInputProps } from "../../types";

const ConditionInput = ({
	selectedCondition,
	setSelectedCondition
}: ConditionInputProps) => {
	return (
		<div className="space-y-3">
			<h2 className="text-lg font-semibold">
				Which one of these conditions best describes your situation?
			</h2>
			<div className="flex gap-12 flex-wrap">
				{conditionInputs.map((condition) => (
					<ToggleCondition
						key={condition}
						condition={condition}
						selectedCondition={selectedCondition}
						handleToggle={() => setSelectedCondition(condition)}
					/>
				))}
			</div>
		</div>
	);
};

export default ConditionInput;
