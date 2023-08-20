import { BsFilter } from "react-icons/bs";
import React, { FC, useEffect, useState } from "react";

interface DropDownProps {
	cities: string[],
	value: string,
	name: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	placeholder: string,
	setValue: (field: string, value: any) => void;
}

const DropDown: FC<DropDownProps> = ({name, cities, value, setValue, onChange, placeholder}) => {

	const results = cities.filter(city => city.toLowerCase().includes(value.toLowerCase()));
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false)
	const [citySelected, setCitySelected] = useState(false);

	useEffect(() => {
		if (value.length > 1 && !citySelected) {
			setIsOpen(true);
		}
	}, [value, citySelected]);

	const listOnClickHandler = (city: string) => {
		setValue('country', city);
		setIsOpen(false);
		setCitySelected(true);
	};

	return (

			<label className={value.length > 1 ? "filter-label-chosen" : "filter-input w-full"}>
				<input
					placeholder={placeholder}
					className={value.length > 1 ? "filter-label-input" : "w-[125px] text-4 bg-[#F9F6EC]"}
					value={value}
					onChange={onChange}
					name={name}
				/>
				<BsFilter size={24} color={value.length > 1 ? "white" : ''} />
				{isOpen &&
					<ul id="cities" className={"filter-drop-down"}>
						{results.map((city, index) => (
							<li key={index}
									onMouseDown={() => setActiveIndex(index)}
									onMouseUp={() => setActiveIndex(null)}
									onClick={() => {
										listOnClickHandler(city);
									}}
									style={index === activeIndex ? { backgroundColor: "black", color: "white", cursor: 'pointer'} : {}}
							>
								{city}
							</li>
						))}
					</ul>}
			</label>

	);
};

export default DropDown;