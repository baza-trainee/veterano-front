import React, { FC, ChangeEvent } from "react";

interface AdminInputProps {
	placeholder: string;
	name: string;
	onSelect: (file: File | null) => void;
	error?: string;
	children: React.ReactNode;
}

export const AdminInputFile: FC<AdminInputProps> = ({
	onSelect,
	name,
	placeholder,
	children,
}) => {
	const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		onSelect(file);
	};

	return (
		<label
			htmlFor={name}
			className="w-full bg-[#fff] px-[10px] py-[11px] hover:shadow-middle rounded flex justify-between hover:cursor-pointer"
		>
			<input
				type="file"
				className="hidden"
				onChange={handleFileSelect}
				id={name}
				placeholder={placeholder}
			/>

			{children}

			<img src="/images/admin/upload.svg" />
		</label>
	);
};
