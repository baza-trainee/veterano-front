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
				className="flex gap-[20px] items-center justi cursor-pointer peer font-light text-[14px] leading-[26px] md:text-[18px] md:leading-[28px]"
			>
				<BiCheck
					fill={checked ? "black" : "transparent"}
					className={
						"block rounded-[4px] bg-yellow100 border-black border-[2px] w-[24px] h-[24px] " +
						(!checked && " bg-[transparent]")
					}
				/>
				{label || children}
			</label>
		</>
	);
};
export default Checkbox;
