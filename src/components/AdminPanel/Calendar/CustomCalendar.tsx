import { useState, useRef, FC, SetStateAction, Dispatch } from "react";
import "./index.css";
import { areEqual, getMonthData } from "./functions.ts";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

interface CalendarProps {
	date?: Date;
	years?: number[];
	monthNames?: string[];
	weekDayNames?: string[];
	onValueSelected?: (publication: string) => void;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomCalendar: FC<CalendarProps> = ({
																						 date = new Date(),
																						 years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
																						 monthNames = ["Січ.", "Лют.", "Бер.", "Квіт.", "Трав.", "Черв.", "Лип.", "Серп.", "Вер.", "Жовт.", "Лист.", "Груд."],
																						 weekDayNames = ["П", "В", "С", "Ч", "П", "С", "Н"],
																						 onValueSelected,
																						 setIsOpen,
																					 }) => {
	const [stateDate, setDate] = useState(date);
	const [currentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const monthSelect = useRef<HTMLSelectElement>(null);
	const yearSelect = useRef<HTMLSelectElement>(null);

	const year = stateDate.getFullYear();
	const month = stateDate.getMonth();

	const handlePrevMonthButtonClick = () => {
		const date = new Date(year, month - 1);
		setDate(date);
	};

	const handleNextMonthButtonClick = () => {
		const date = new Date(year, month + 1);
		setDate(date);
	};

	const handlePrevYearButtonClick = () => {
		const date = new Date(year - 1, month);
		setDate(date);
	};

	const handleNextYearButtonClick = () => {
		const date = new Date(year + 1, month);
		setDate(date);
	};

	const handleSelectChange = () => {
		const year = yearSelect.current ? yearSelect.current.value : "defaultYearValue";
		const month = monthSelect.current ? monthSelect.current.value : "defaultMonthValue";
		const date = new Date(Number(year), Number(month));
		setDate(date);
	};

	const handleDayClick = (date: Date | null) => {
		if (date) {
			setSelectedDate(date);
		}
	};

	const OkBtnClickHandler = (selectedDate: Date) => {
		const formattedDate = selectedDate.toLocaleDateString("uk-UA", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
		if (onValueSelected) {
			onValueSelected(formattedDate);
		}
		setIsOpen(false);

	};

	const monthData = getMonthData(year, month);

	return (
		<div className="calendar">
			<header>
				<button onClick={handlePrevMonthButtonClick}><LiaAngleLeftSolid size={20} /></button>
				<select
					className={"custom-select"}
					ref={monthSelect}
					value={month}
					onChange={handleSelectChange}
				>
					{monthNames.map((name, index) =>
						<option key={name} value={index}>{name}</option>,
					)}
				</select>
				<button onClick={handleNextMonthButtonClick}><LiaAngleRightSolid size={20} /></button>
				<button onClick={handlePrevYearButtonClick}><LiaAngleLeftSolid size={20} /></button>
				<select
					className={"custom-select"}
					ref={yearSelect}
					value={year}
					onChange={handleSelectChange}
				>
					{years.map(year =>
						<option key={year} value={year}>{year}</option>,
					)}
				</select>
				<button onClick={handleNextYearButtonClick}><LiaAngleRightSolid size={20} /></button>
				<button className={"text-[12px]"} type="button"
								onClick={() => {
									if (selectedDate) {
										OkBtnClickHandler(selectedDate);
									}
								}}
				>OK
				</button>
			</header>

			<table>
				<thead>
				<tr>
					{weekDayNames.map((name, index) =>
						<th key={index}>{name}</th>,
					)}
				</tr>
				</thead>

				<tbody>
				{monthData.map((week, index) => (
					<tr key={index} className="week">
						{week.map((date, dateIndex) => {
							const isGrey = date && date.getMonth() !== month;
							const isSelected = date && areEqual(date, selectedDate);
							const isToday = date && areEqual(date, currentDate) && !selectedDate;

							return (
								<td
									key={dateIndex}
									className={[
										"day",
										isGrey ? "grey" : "",
										isToday ? "today" : "",
										isSelected ? "selected" : "",
									].join(" ")}
									onClick={() => date && handleDayClick(date)}
								>
									{date ? date.getDate() : ""}
								</td>
							);
						})}
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default CustomCalendar;