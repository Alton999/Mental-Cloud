import { TextInputProps } from "../../types";

const TextInput = ({ handleChange, name }: TextInputProps) => {
	return (
		<textarea
			name={name}
			id={name}
			className=" p-2 w-full bg-transparent border-2 border-sky-200 rounded-xl text-lg"
			onChange={(e) => handleChange(e.target.value)}
			rows={4}
		/>
	);
};

export default TextInput;
