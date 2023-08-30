import { FC } from "react";

interface AdminInputProps {
	value: string;
	placeholder: string;
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	type?: string;
}

const AdminInput: FC<AdminInputProps> = ({
	error,
	value,
	name,
	placeholder,
	type = "text",
	...props
}) => {
	return (
		<label
			className={
				"w-full bg-[#fff] px-[10px] py-[11px] hover:shadow-middle rounded "
			}
		>
			<input
				value={value}
				type={type}
				placeholder={error ? error : placeholder}
				name={name}
				className={
					"w-full focus:outline-none placeholder:text-[14px] placeholder:text-grey50 invalid:placeholder:text-error30"
				}
				{...props}
			/>
		</label>
	);
};

export default AdminInput;
