import { BsChevronDown, BsChevronUp } from "react-icons/bs";
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
	onValueSelected: (category: string) => void;
	error?: string
}

const CategoryDropDown: FC<AdminDropDownProps> = ({ error, value, name, onChange, placeholder, onValueSelected }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [results, setResults] = useState<ResultsType[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [categorySelected, setCategorySelected] = useState(false);
	const [inputValue, setInputValue] = useState("");


	useEffect(() => {
		if (value.length > 1 && !categorySelected) {
			const categoriesList = value.length > 2 ? results.filter(category => category.categoryName.includes(value)) : results;
			if (categoriesList.length > 0) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		}
	}, [value, categorySelected, results]);

	useEffect(() => {
		getCategoryList()
			.then(data => setResults(data));
	}, []);

	const listOnClickHandler = (category: string) => {
		onValueSelected(category);
		setInputValue(`${capitalizeFirstLetter(category.trim())}`);
		setIsOpen(false);
		setCategorySelected(true);
	};

	const categoriesList = value.length > 2 ? results.filter(category => category.categoryName.includes(value)) : results;

	return (

		<label className={"admin-filter-input w-full"}>
			<input
				placeholder={error ? error : placeholder}
				value={inputValue}
				onChange={e => {
					onChange(e);
					setCategorySelected(false);
					setInputValue(e.target.value);
				}}
				name={name}
			/>
			{isOpen ?
				<BsChevronUp
					size={18}
					onClick={() => {
						setIsOpen(!isOpen);
						setInputValue("Оберіть категорію");
					}}
					className={"cursor-pointer"} />
				:
				<BsChevronDown
					size={18}
					onClick={() => {
						setIsOpen(!isOpen);
						setInputValue("Оберіть категорію");
					}}
					className={"cursor-pointer"} />
			}
			{isOpen &&
				<ul id="categories" className={"admin-filter-drop-down z-10"}>
					{categoriesList.map((item, index) =>
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
										backgroundColor: "##F7D67F",
										cursor: "pointer",
									}
									: {}
							}
						>
							{capitalizeFirstLetter(item.categoryName.trim())}
						</li>,
					)}
				</ul>
			}
		</label>

	);
};

export default CategoryDropDown;
