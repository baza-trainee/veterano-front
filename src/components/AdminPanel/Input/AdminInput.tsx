import { FC } from "react";

interface AdminInputProps {
	value: string,
	placeholder: string,
	name: string,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	type: string;
}

const AdminInput: FC<AdminInputProps> = ({error, type, value, name, placeholder, ...props }) => {
	return (
			<input
				value={value}
				type={type}
				placeholder={error ? error : placeholder}
				name={name}
				className={'w-full h-[48px] bg-white hover:shadow-middle rounded px-[10px] py-[11px] focus:outline-none placeholder:text-[14px] placeholder:text-grey50 invalid:placeholder:text-error30'}
				{...props}
			/>
	);
};

export default AdminInput;