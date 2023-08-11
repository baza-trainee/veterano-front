import { ChangeEvent } from "react";

interface FilterButtonProps {
	id?: string;
	checked?: boolean;
	label: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
	id,
	checked = false,
	label,
	value,
	onChange = ({ target }) => {
		console.log(target.value);
	},
	...props
}) => {
	return (
		<div>
			<input
				{...props}
				className="hidden peer"
				// id={id}
				id={id}
				type="radio"
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			<label htmlFor={id} className="peer-checked:text-red-600">
				{label}
			</label>
		</div>
	);
};

export default FilterButton;
