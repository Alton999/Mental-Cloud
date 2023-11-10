import React from "react";
import { TextInputProps } from "../../types";

const TextInput = ({ handleChange, name }: TextInputProps) => {
	return (
		<textarea
			name={name}
			// type="text"
			id={name}
			className="text-black p-2 w-full text-sm "
			onChange={(e) => handleChange(e.target.value)}
		/>
	);
};

export default TextInput;
