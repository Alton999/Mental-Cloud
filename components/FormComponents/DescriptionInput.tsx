import { TextInput } from "..";
import { DescriptionInputProps } from "../../types";

const DescriptionInput = ({
	description,
	setDescription
}: DescriptionInputProps) => {
	return (
		<div className="space-y-3">
			<label htmlFor="description" className="font-semibold text-lg">
				How has this condition affected you? Give a short sentence describing
				your situation.
			</label>
			<TextInput name="description" handleChange={setDescription} />
		</div>
	);
};

export default DescriptionInput;
