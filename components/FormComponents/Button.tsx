"use client";
import React from "react";
import { ButtonProps } from "../../types";
import { motion } from "framer-motion";

const Button = ({ handleClick, text, primary, secondary }: ButtonProps) => {
	return (
		<motion.button
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 400, damping: 16 }}
			className={`px-12 py-3 rounded-lg  font-bold text-lg   ${
				secondary && "border border-white hover:bg-slate-100 hover:text-black"
			} ${primary && "bg-indigo-600 text-white hover:bg-indigo-700"}`}
			onClick={handleClick}
		>
			{text}
		</motion.button>
	);
};

export default Button;
