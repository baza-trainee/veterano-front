import { ChangeEvent, TextareaHTMLAttributes } from "react";
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	id: string;
	value: string;
	className?: string;
	placeholder?: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
const Textarea: React.FC<TextareaProps> = ({
	label = "",
	id = "",
	value = "",
	className = "",
	placeholder = "",
	onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		console.log(event);
	},
	...props
}) => {
	return (
		<>
			<label className={"block" + " " + className}>
				{label}
				<textarea
					minLength={300}
					placeholder={placeholder}
					className="block p-[12px] w-[100%] min-h-[120px] max-h-[520px] border-[1px] border-black rounded-[4px] hover:border-[black] md:max-h-[480px] lg:max-h-[320px]"
					id={id}
					onChange={onChange}
					value={value}
					{...props}
				/>
			</label>
		</>
	);
};

export default Textarea;
