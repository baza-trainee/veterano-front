import { BsFilter } from "react-icons/bs";
import React, { FC, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import { getCitiesList } from "../../../api/SearchAPI.tsx";


interface CitiesDropDownProps {
	value: string,
	name: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	placeholder: string,
	onValueSelected: (location: { city: string; country: string }) => void;
	error?: string
}

interface ResultsType {
	city: string;
	country: string;
	error?: string;
}

const CitiesDropDown: FC<CitiesDropDownProps> = ({ error, value, onChange, placeholder, name, onValueSelected }) => {

	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [results, setResults] = useState<ResultsType[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [citySelected, setCitySelected] = useState(false);
	const [inputValue, setInputValue] = useState("");


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
		setInputValue(`${capitalizeFirstLetter(city)}`);
		setIsOpen(false);
		setCitySelected(true);
	};


	const cities = results.filter((cityObj) =>
		cityObj.city.toLowerCase().includes(value.toLowerCase()) ||
		cityObj.country.toLowerCase().includes(value.toLowerCase()),
	);

	return (

		<label className={"admin-filter-input w-full"}>
			<input
				placeholder={error ? error : placeholder}
				value={inputValue}
				onChange={e => {
					onChange(e);
					setCitySelected(false);
					setInputValue(e.target.value);
				}}
				name={name}
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
										backgroundColor: "##F7D67F",
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

export default CitiesDropDown;