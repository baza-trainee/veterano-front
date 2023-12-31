import { BsFilter } from "react-icons/bs";
import React, { FC, useEffect, useState } from "react";
import { LocationType } from "../SearchForm/SearchForm.tsx";
import { capitalizeFirstLetter } from "../../../utils/functions/functions.ts";
import NavigationLink from "../Links/NavigationLink.tsx";
import { useURLParams } from "../../hooks/useURLParams.tsx";



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
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const paramsValue = useURLParams("city")
	const [isManuallyEdited, setIsManuallyEdited] = useState(false);

	useEffect(() => {
		if (value.length > 1 && !citySelected) {
			setIsOpen(true);
		}
	}, [value, citySelected]);

	const openListHandler = () => {
		setIsFilterOpen(!isFilterOpen);
	};
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
			className={value.length > 1 || paramsValue ? "filter-label-chosen h-[48px]" : "filter-input w-full h-[48px]"}
		>
			<input
				autoComplete="none"
				placeholder={placeholder}
				className={
					value.length > 1 || paramsValue
						? "filter-label-input"
						: "w-[125px] bg-[#F9F6EC] font-light text-[14px] leading-[26px] lg:text-[16px] lg:leading-[24px] placeholder:text-grey50"
				}
				value={isManuallyEdited ? inputValue : paramsValue || inputValue}
				onChange={e => {
					setIsManuallyEdited(true);
					if (onChange) {
						onChange(e);
					}
					setCitySelected(false);
					setInputValue(e.target.value);
				}}
				onBlur={() => {
					setIsFilterOpen(false);
					setIsOpen(false);
				}}
				onKeyDown={handleKeyPress}
				name={name}
			/>
			<div onMouseDown={openListHandler}>
				<BsFilter size={24} color={value.length > 1 || paramsValue ? "white" : ""} />
			</div>

			{isOpen || isFilterOpen && results.length > 0 ? (
				<ul id="cities" className={"filter-drop-down z-10"}>
					<li
						onMouseDown={() => {
							listOnClickHandler("", "");
						}}

					>Всі локації
					</li>
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
							{capitalizeFirstLetter(item.country)}/{capitalizeFirstLetter(item.city)}
						</li>
					))}
				</ul>
			) : (
				isOpen || isFilterOpen && results.length === 0 &&
				<div className={"filter-drop-down z-10 p-[20px] flex justify-center items-center"}>
					{page === "search"
						?
						<p className={"text-[14px] leading-6 font-light text-center"}>
							Нажаль, зараз у нас немає проєктів у данному регіоні.</p> :
						<p className={"text-[14px] leading-6 font-light text-center"}>
							Нажаль, зараз у нас немає проєктів у данному регіоні. Ви можете переглянути всі доступні проєкти
							за <NavigationLink to={"search"} variant={"underlineFooter"}
																 style={{ fontSize: "14px" }}>посиланням</NavigationLink>
						</p>
					}

				</div>
			)}
		</label>

	);
};

export default DropDown;