import { BsFilter } from "react-icons/bs";
import React, { FC, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import { getCitiesList } from "../../../api/SearchAPI.tsx";


interface CitiesDropDownProps {
	value: string,
	name: string,
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
	placeholder: string,
	onValueSelected: (location: { city: string; country: string }) => void;
	error?: string
	inputDisplayValue?: { city: string; country: string } | string
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface ResultsType {
	city: string;
	country: string;
	error?: string;
}

const CitiesDropDown: FC<CitiesDropDownProps> = ({
																									 onBlur,
																									 onChange,
																									 inputDisplayValue,
																									 value,
																									 placeholder,
																									 name,
																									 onValueSelected,
																								 }) => {

	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [results, setResults] = useState<ResultsType[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [citySelected, setCitySelected] = useState(false);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		if (inputDisplayValue && typeof inputDisplayValue === 'object' && !citySelected) {
			const value = `${capitalizeFirstLetter(inputDisplayValue.country)}/${capitalizeFirstLetter(inputDisplayValue.city)}`;
			setInputValue(value);
		}
	}, [inputDisplayValue, citySelected]);

	useEffect(() => {
		if (value.length > 1 && !citySelected) {
			const cities = results.filter((cityObj) =>
				cityObj.city.toLowerCase().includes(value.toLowerCase()) ||
				cityObj.country.toLowerCase().includes(value.toLowerCase()),
			);
			if (cities.length > 0) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		}
	}, [value, citySelected]);

	useEffect(() => {
		getCitiesList()
			.then(data => setResults(data));
	}, []);

	const listOnClickHandler = (city: string, country: string) => {
		onValueSelected({ city, country });
		setInputValue(`${capitalizeFirstLetter(city)}/${capitalizeFirstLetter(country)}`);
		setIsOpen(false);
		setCitySelected(true);
	};

	const cities = results.filter((cityObj) => {
		if (typeof value === 'string') {
			return cityObj.city.toLowerCase().includes(value.toLowerCase()) ||
				cityObj.country.toLowerCase().includes(value.toLowerCase());
		}
		return false;
	});

	return (

		<label className={"admin-filter-input w-full h-[48px] text-[16px] leading-[26px] font-light"}>
			<input
				placeholder={placeholder}
				value={inputValue}
				onChange={(e) => {
					const newValue = e.target.value;
					setInputValue(newValue);
					setCitySelected(false);
					if (onChange) onChange(e);

				}}
				onBlur={(e) => {
					if (inputValue) {
						const separatorIndex = inputValue.indexOf("/");
						if (separatorIndex !== -1) {
							const country = inputValue.slice(0, separatorIndex).trim();
							const city = inputValue.slice(separatorIndex + 1).trim();
							onValueSelected({ country, city });
							setInputValue(`${country} / ${city} `);
						}
					}
					if (onBlur) onBlur(e);
				}}
				name={name}
				className={"placeholder:placeholder-grey"}
			/>
			<BsFilter size={24} />
			{isOpen &&
				<ul id="cities" className={"admin-filter-drop-down z-10"}>
					{cities.map((item, index) => (
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
										backgroundColor: "#F7D67F",
										cursor: "pointer",
									}
									: {}
							}>
							{capitalizeFirstLetter(item.country)}/{capitalizeFirstLetter(item.city)}
						</li>
					))}
				</ul>}
		</label>

	);
};

export default CitiesDropDown;