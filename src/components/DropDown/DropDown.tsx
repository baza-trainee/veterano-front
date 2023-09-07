import { BsFilter } from "react-icons/bs";
import React, { FC, useEffect, useState } from "react";
import { LocationType } from "../SearchForm/SearchForm.tsx";
import { capitalizeFirstLetter } from "../../../utils/functions/functions.ts";


interface DropDownProps {
	cities: LocationType[],
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
		setInputValue(`${capitalizeFirstLetter(city)}`)
		setIsOpen(false);
		setCitySelected(true);
	};

	return (

			<label
				className={value.length > 1 ? "filter-label-chosen h-[48px]" : "filter-input  w-full h-[48px]"}
			>
				<input
					placeholder={placeholder}
					className={
						value.length > 1
							? "filter-label-input"
							: "w-[125px] bg-[#F9F6EC] font-light text-[14px] leading-[26px] lg:text-[16px] lg:leading-[24px] placeholder:text-grey50"
					}
					value={inputValue}
					onChange={e => {
						onChange(e);
						setCitySelected(false);
						setInputValue(e.target.value);
					}}
					onBlur={() => setIsOpen(false)}
					name={name}
				/>
				<BsFilter size={24} color={value.length > 1 ? "white" : ''} />
				{isOpen &&
					<ul id="cities" className={"filter-drop-down z-10"}>
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
								}>
								{capitalizeFirstLetter(item.city)}/{capitalizeFirstLetter(item.country)}
							</li>
						))}
					</ul>}
			</label>

	);
};

export default DropDown;