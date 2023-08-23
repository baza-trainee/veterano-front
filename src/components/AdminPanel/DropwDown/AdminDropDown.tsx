import { BsChevronDown } from "react-icons/bs";
import React, { FC, useEffect, useState } from "react";
import { getCategoryList } from "../../../api/SearchAPI.tsx";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";

interface ResultsType {
	categoryName: string;
}

interface AdminDropDownProps {
	value: string,
	name: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	placeholder: string,
	onValueSelected: ( category: string) => void;
}

const AdminDropDown: FC<AdminDropDownProps> = ({value, name, onChange, placeholder, onValueSelected,  }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [results, setResults] = useState<ResultsType[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [categorySelected, setCategorySelected] = useState(false);
	const [inputValue, setInputValue] = useState("");


	useEffect(() => {
		if (value.length > 1 && !categorySelected) {
			setIsOpen(true);
		}
	}, [value, categorySelected]);

	useEffect(() => {
		getCategoryList()
			.then(data => setResults(data));
	}, []);

	const listOnClickHandler = (category: string) => {
		onValueSelected(category);
		setInputValue(`${capitalizeFirstLetter(category)}`);
		setIsOpen(false);
		setCategorySelected(true);
	};

	return (

		<label
			className={value.length > 1 ? "filter-label-chosen" : "filter-input w-full"}
		>
			<input
				placeholder={placeholder}
				className={
					value.length > 1
						? "filter-label-input"
						: "w-[125px] text-4 bg-[#F9F6EC]"
				}
				value={inputValue}
				onChange={e => {
					onChange(e);
					setCategorySelected(false);
					setInputValue(e.target.value);
				}}
				name={name}
			/>
			<BsChevronDown size={24} color={value.length > 1 ? "white" : ""} onClick={() => setIsOpen(!isOpen)} className={'cursor-pointer'} />
			{isOpen &&
				<ul id="categories" className={"filter-drop-down z-10"}>
					{value.length > 2 ?
						results.filter(category => category.categoryName.includes(value)).map((item, index) =>
							<li
								key={index}
								onMouseDown={() => setActiveIndex(index)}
								onMouseUp={() => setActiveIndex(null)}
								onClick={() => {
									listOnClickHandler(item.categoryName);
								}}
								style={
									index === activeIndex
										? {
											backgroundColor: "black",
											color: "white",
											cursor: "pointer",
										}
										: {}
								}
							>
								{capitalizeFirstLetter(item.categoryName)}
							</li>
						) :
						results.map((item, index) =>
							<li
								key={index}
								onMouseDown={() => setActiveIndex(index)}
								onMouseUp={() => setActiveIndex(null)}
								onClick={() => {
									listOnClickHandler(item.categoryName);
								}}
								style={
									index === activeIndex
										? {
											backgroundColor: "black",
											color: "white",
											cursor: "pointer",
										}
										: {}
								}
							>
								{capitalizeFirstLetter(item.categoryName)}
							</li>
						)
					}

				</ul> }
		</label>

	);
};

export default AdminDropDown;
