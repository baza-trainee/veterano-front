import { FC } from "react";

interface AdminInputProps {
	value: string;
	placeholder: string;
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	type: string;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const AdminInput: FC<AdminInputProps> = ({onBlur, error, type, value, name, placeholder, ...props }) => {

	return (
		<>
			<input
				value={value}
				type={type}
				placeholder={placeholder}
				name={name}
				onBlur={onBlur}
				className={`w-full h-[48px] bg-white hover:shadow-middle font-light rounded px-[10px] py-[11px] focus:outline-none placeholder:text-[14px] placeholder:leading-[26px] placeholder:font-light placeholder:text-grey50 `}
				{...props}
			/>
			{error &&
				<div className={'text-error50 font-light text-[16px] leading-6 mt-1 pl-2'}>{error}</div>}
		</>
	);
};

export default AdminInput;
