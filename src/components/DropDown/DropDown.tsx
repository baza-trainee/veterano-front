import { BsFilter } from "react-icons/bs";
import React, { FC, useEffect, useState } from "react";
import { LocationType } from "../SearchForm/SearchForm.tsx";
import { capitalizeFirstLetter } from "../../../utils/functions/functions.ts";
import NavigationLink from "../Links/NavigationLink.tsx";


interface DropDownProps {
	cities: LocationType[],
	value: string,
	name: string,
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
	placeholder: string,
	onValueSelected: (location: { city: string; country: string }) => void;
	page?: string
}

const DropDown: FC<DropDownProps> = ({
																			 cities,
																			 value,
																			 onChange,
																			 placeholder,
																			 name,
																			 onValueSelected,
																			 page,
																		 }) => {

	const results = cities.filter((cityObj) =>
		cityObj.city.toLowerCase().includes(value.toLowerCase()) ||
		cityObj.country.toLowerCase().includes(value.toLowerCase()),
	);

	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [citySelected, setCitySelected] = useState(false);
	const [inputValue, setInputValue] = useState("");


	useEffect(() => {
		if (value.length > 1 && !citySelected) {
			setIsOpen(true);
		}
	}, [value, citySelected]);


	const listOnClickHandler = (city: string, country: string) => {
		onValueSelected({ city, country });
		setInputValue(`${capitalizeFirstLetter(city)}`);
		setIsOpen(false);
		setCitySelected(true);
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && inputValue.length > 0) {
			event.preventDefault();
		}
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
					if(onChange) {
						onChange(e);
					}
					setCitySelected(false);
					setInputValue(e.target.value);
				}}
				onBlur={() => setIsOpen(false)}
				onKeyDown={handleKeyPress}
				name={name}
			/>
			<BsFilter onClick={() => setIsOpen(true)} size={24} color={value.length > 1 ? "white" : ""} />
			{isOpen && results.length > 0 ? (
				<ul id="cities" className={"filter-drop-down z-10"}>
					<li
						onMouseDown={() => {
							listOnClickHandler("", "");
						}}

					>Всі локації</li>
					{results.map((item, index) => (
						<li
							key={index}
							onMouseDown={() => {
								listOnClickHandler(item.city, item.country);
								setActiveIndex(index);
							}}
							onMouseUp={() => setActiveIndex(null)}
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
							{capitalizeFirstLetter(item.city)}/{capitalizeFirstLetter(item.country)}
						</li>
					))}
				</ul>
			) : (
				results.length === 0 &&
				<div className={"filter-drop-down z-10 p-[20px] flex justify-center items-center"}>
					{page === 'search'
						?
						<p className={"text-[14px] leading-6 font-light text-center"}>
							Нажаль, зараз у нас немає проєктів у данному регіоні.</p> :
						<p className={"text-[14px] leading-6 font-light text-center"}>
							Нажаль, зараз у нас немає проєктів у данному регіоні. Ви можете переглянути всі доступні проєкти за <NavigationLink to={'search'} variant={'underlineFooter'} style={{fontSize: '14px'}}>посиланням</NavigationLink>
						</p>

					}

				</div>
			)}
		</label>

	);
};

export default DropDown;