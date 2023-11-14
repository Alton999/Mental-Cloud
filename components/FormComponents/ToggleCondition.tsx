"use client";
import { motion } from "framer-motion";
import { ToggleConditionProps } from "../../types";

const ToggleCondition = ({
	condition,
	selectedCondition,
	handleToggle
}: ToggleConditionProps) => {
	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 600, damping: 16 }}
			className={`w-40 px-2 py-6 flex justify-center items-center border text-center border-sky-200 rounded-xl cursor-pointer  ${
				selectedCondition === condition
					? "border-2  bg-sky-600/40"
					: "border-1 "
			}`}
			onClick={handleToggle}
		>
			{condition}
		</motion.button>
	);
};

export default ToggleCondition;
