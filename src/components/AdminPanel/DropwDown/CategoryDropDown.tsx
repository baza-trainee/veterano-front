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
	error?: string,
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const CategoryDropDown: FC<AdminDropDownProps> = ({ onBlur, value, name, onChange, placeholder, onValueSelected }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [results, setResults] = useState<ResultsType[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [categorySelected, setCategorySelected] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [inputPlaceholder, setInputPlaceholder] = useState("")

	useEffect(() => {
		if (value) {
			setInputValue(value);
			setCategorySelected(true)
		}
	}, [inputValue, categorySelected]);

	useEffect(() => {
		if (value.length > 1 && !categorySelected) {
			const categoriesList = value.length > 0 ? results.filter(category => category.categoryName.includes(value)) : results;
			if (categoriesList.length > 0) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		}
		setInputValue(value);
	}, [value, categorySelected]);

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

		<label className={"admin-filter-input w-full h-[48px] text-[16px] leading-[24px] font-light"}>
			<input
				placeholder={inputPlaceholder ? inputPlaceholder : placeholder}
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
					setCategorySelected(false);
					onValueSelected(e.target.value);
					onChange(e);
				}}
				onBlur={(e) => {
					onValueSelected(e.target.value);
					setInputValue(e.target.value);
					if (onBlur) onBlur(e);
				}}
				name={name}
				className={`${inputPlaceholder ? "placeholder:text-black placeholder:text-[16px] placeholder:leading-[24px]" : "placeholder:placeholder-grey placeholder:text-[14px] placeholder:leading-[26px]" } "placeholder:font-light" `}
			/>
			{isOpen ?
				<BsChevronUp
					size={18}
					onClick={() => {
						setIsOpen(!isOpen);

					}}
					className={"cursor-pointer"} />
				:
				<BsChevronDown
					size={18}
					onClick={() => {
						setIsOpen(!isOpen);
						setInputPlaceholder("Оберіть категорію");
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
