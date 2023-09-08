import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { BiCheck } from "react-icons/bi";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
	checked?: boolean;
	onCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
	children?: React.ReactNode;
}
const Checkbox: React.FC<CheckboxProps> = ({
	id = "test",
	label,
	checked = false,
	onCheck = (event: ChangeEvent<HTMLInputElement>): void => {
		console.log(event.target.checked);
	},
	children,
	...props
}) => {
	return (
		<>
			<input
				{...props}
				type="checkbox"
				id={id}
				checked={checked}
				onChange={onCheck}
				className="hidden peer"
			/>
			<label
				htmlFor={id}
				className="flex gap-2 cursor-pointer peer font-light text-[14px] leading-[26px] md:text-[18px] md:leading-[28px]"
			>
			<div className={'w-[48px] h-[48px] ml-[-10px] flex justify-center'}>
				<BiCheck
					fill={checked ? "black" : "transparent"}
					className={
						"block rounded-[4px] border-black border-[2px] w-[24px] h-[24px] " +
						(checked && " bg-yellow100")
					}
				/>
			</div>
				{label || children}
			</label>
		</>
	);
};
export default Checkbox;
