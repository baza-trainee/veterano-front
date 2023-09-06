import { ChangeEvent } from "react";

interface FilterButtonProps {
	id: string;
	checked?: boolean;
	label: string;
	value: string;
	name: string;
	className?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onClick?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
	id,
	checked = false,
	label,
	name,
	value,
	onChange = ({ target }) => {
		console.log(target.value);
	},
	onClick,
	className = "",
	...props
}) => {
	const checkedClass =
		"peer-checked:bg-white " +
		"peer-checked:text-black-300 " +
		"peer-checked:hover:bg-black " +
		"peer-checked:text-[14px]";
	return (
		<div>
			<input
				{...props}
				className="hidden peer"
				id={id}
				type="radio"
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
				onClick={onClick}
			/>
			<label
				htmlFor={id}
				className={
					"cursor-pointer flex text-[14px] px-[8px] rounded-[51px] leading-[26px] font-light border-[1px] border-black hover:bg-black hover:text-white " +
					checkedClass +
					" " +
					className
				}
			>
				{label}
			</label>
		</div>
	);
};

export default FilterButton;
