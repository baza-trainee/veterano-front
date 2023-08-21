import { BsFilter } from "react-icons/bs";
import React, { FC, useEffect, useState } from "react";
import { CitiesType } from "../SearchForm/SearchForm.tsx";


interface DropDownProps {
	cities: CitiesType[],
	value: string,
	name: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	placeholder: string,
	onValueSelected: (location: { city: string; country: string }) => void;
}

const DropDown: FC<DropDownProps> = ({
	cities,
	value,
	onChange,
	placeholder,
	name,
	onValueSelected
}) => {

	const results = cities.filter((cityObj) =>
		cityObj.city.toLowerCase().includes(value.toLowerCase()) ||
		cityObj.country.toLowerCase().includes(value.toLowerCase())
	);

	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [citySelected, setCitySelected] = useState(false);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if (value.length > 1 && !citySelected) {
			setIsOpen(true);
		}
	}, [value, citySelected]);

	const listOnClickHandler = (city: string, country: string) => {
		onValueSelected({ city, country })
		setInputValue(`${city} / ${country}`)
		setIsOpen(false);
		setCitySelected(true);
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
						setCitySelected(false);
						setInputValue(e.target.value);
					}}
					name={name}
				/>
				<BsFilter size={24} color={value.length > 1 ? "white" : ''} />
				{isOpen &&
					<ul id="cities" className={"filter-drop-down"}>
						{results.map((item, index) => (
							<li
								key={index}
								onMouseDown={() => setActiveIndex(index)}
								onMouseUp={() => setActiveIndex(null)}
								onClick={() => {
									listOnClickHandler(item.city, item.country);
								}}
								style={
									index === activeIndex
										? {
											backgroundColor: "black",
											color: "white",
											cursor: "pointer",
										}
										: {}
								}							>
								{item.city}/{item.country}
							</li>
						))}
					</ul>}
			</label>

	);
};

export default DropDown;