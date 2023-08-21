import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import DropDown from "../DropDown/DropDown";
import Container from "../Container/Container";
import FilterButton from "../FilterButton/FilterButton";

interface CheckboxFormState {
	["Реабілітація"]: boolean;
	["Навчання"]: boolean;
	["Юридичні послуги"]: boolean;
	["Бізнес підтримка"]: boolean;
	["Всі"]: boolean;
}
//test cities
const cities = ["New York", "London", "Paris", "Tokyo", "Sydney"];

const HeroSearchBar = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [checkboxes, setCheckboxes] = useState<CheckboxFormState>({
		["Реабілітація"]: false,
		["Навчання"]: false,
		["Юридичні послуги"]: false,
		["Бізнес підтримка"]: false,
		["Всі"]: false,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};
	const handleCityChange = (selectedCity: string) => {
		setCity(selectedCity);
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setCheckboxes((prevCheckboxes) => ({
			...prevCheckboxes,
			[name]: checked,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Form submitted:", {
			inputValue,
			city,
			checkboxes,
		});
	};

	return (
		<Container>
			<form action="" onSubmit={handleSubmit} className=" w-full p-4">
				<div className="flex flex-col gap-6 justify-start md:flex-row mb-4">
					<SearchBar
						id="query"
						disabled={false}
						value={inputValue}
						placeholder="Введіть ключове слово для пошуку"
						onChange={handleInputChange}
					/>
					<DropDown
						cities={cities}
						value={city}
						onChange={handleCityChange}
						setValue={(element) => {
							setCity(element);
						}}
						placeholder="Країна / місто"
					/>
				</div>
				<div className="noScrollbar flex gap-[17px] overflow-x-scroll">
					<FilterButton
						id="filret-1"
						label="Реабілітація"
						name="Реабілітація"
						value="Реабілітація"
						onChange={handleCheckboxChange}
						checked={checkboxes["Реабілітація"]}
					/>
					<FilterButton
						id="filret-2"
						label="Навчання"
						value="Навчання"
						name="Навчання"
						onChange={handleCheckboxChange}
						checked={checkboxes["Навчання"]}
					/>
					<FilterButton
						id="filret-3"
						label="Юридичні послуги"
						value="Юридичні послуги"
						name="Юридичні послуги"
						onChange={handleCheckboxChange}
						checked={checkboxes["Юридичні послуги"]}
					/>
					<FilterButton
						id="filret-4"
						label="Бізнес підтримка"
						value="Бізнес підтримка"
						name="Бізнес підтримка"
						onChange={handleCheckboxChange}
						checked={checkboxes["Бізнес підтримка"]}
					/>
					<FilterButton
						id="filret-5"
						label="Всi"
						value="Всi"
						name="Всі"
						checked={checkboxes["Всі"]}
						onChange={handleCheckboxChange}
					/>
				</div>
			</form>
		</Container>
	);
};
export default HeroSearchBar;
