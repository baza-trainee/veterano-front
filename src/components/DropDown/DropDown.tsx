import { BsFilter } from "react-icons/bs";
import React, { FC, useState } from "react";

interface DropDownProps {
	cities: [string],
	value: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	isOpen: boolean,
	listOnClickHandler: (city: string) => void,
	placeholder: string
}

const DropDown: FC<DropDownProps> = ({cities, value, onChange, listOnClickHandler, placeholder, isOpen}) => {

	const results = cities.filter(city => city.toLowerCase().includes(value.toLowerCase()));
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	return (

			<label className={value.length > 1 ? "filter-label-chosen" : "filter-input"}>
				<input
					placeholder={placeholder}
					className={value.length > 1 ? "filter-label-input" : "w-[125px] text-4 bg-[#F9F6EC]"}
					value={value}
					onChange={onChange}
				/>
				<BsFilter size={24} color={value.length > 1 && "white"} />
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