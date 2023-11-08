import { ToggleConditionProps } from "../types";

const ToggleCondition = ({
	condition,
	selectedCondition,
	handleToggle
}: ToggleConditionProps) => {
	return (
		<button
			className={`w-36 px-2 h-32 flex justify-center items-center border text-center rounded-xl cursor-pointer transition ease-in-out ${
				selectedCondition === condition
					? "border-2 border-sky-100 bg-sky-600/40"
					: "border-1 border-sky-700"
			}`}
			onClick={handleToggle}
		>
			<p>{condition}</p>
		</button>
	);
};

export default ToggleCondition;
