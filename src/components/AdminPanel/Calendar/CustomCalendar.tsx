import { useState, useRef, FC } from "react";
import "./index.css";
import { areEqual, getMonthData } from "./functions.ts";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

interface CalendarProps {
	date?: Date;
	years?: number[];
	monthNames?: string[];
	weekDayNames?: string[];
	onChange?: (date: Date) => void;
}

const CustomCalendar: FC<CalendarProps> = ({
date = new Date(),
years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
monthNames = ["Січ.", "Лют.", "Бер.", "Квіт.", "Трав.", "Черв.", "Лип.", "Серп.", "Бер.", "Жовт.", "Лист.", "Груд."],
weekDayNames = ["П", "В", "С", "Ч", "П", "С", "Н"],
onChange,
}) => {
	const [stateDate, setDate] = useState(date);
	const [currentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const monthSelect = useRef<HTMLSelectElement>(null);
	const yearSelect = useRef<HTMLSelectElement>(null);

	const year = stateDate.getFullYear();
	const month = stateDate.getMonth();
	const day = stateDate.getDate();

	const handlePrevMonthButtonClick = () => {
		const date = new Date(year, month - 1);
		setDate(date);
	};

	const handleNextMonthButtonClick = () => {
		const date = new Date(year, month + 1);
		setDate(date);
	};

	const handlePrevYearButtonClick = () => {
		const date = new Date(month, year - 1);
		setDate(date);
	};

	const handleNextYearButtonClick = () => {
		const date = new Date(year, year + 1);
		setDate(date);
	};

	const handleSelectChange = () => {
		const year = yearSelect.current ? yearSelect.current.value : "defaultYearValue";
		const month = monthSelect.current ? monthSelect.current.value : "defaultMonthValue";
		const date = new Date(Number(year), Number(month));
		setDate(date);
	};

	const handleDayClick = (date: Date) => {
		setSelectedDate(date);
		if (onChange) {
			onChange(date);
		}
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
			</header>

			<table>
				<thead>
				<tr>
					{weekDayNames.map(name =>
						<th key={name}>{name}</th>,
					)}
				</tr>
				</thead>

				<tbody>
				{monthData.map((week, index) =>
					<tr key={index} className="week">
						{week.map((date, index) => {
							const classes = ['day'];
							let displayDate = date;
							if (!date && index === 0) {
								displayDate = new Date(year, month, 0); // Остання дата попереднього місяця
								classes.push('grey'); // Додайте відповідний стиль в CSS
							}

							if (displayDate) {
								if (areEqual(displayDate, currentDate)) {
									classes.push('today');
								}
								if (areEqual(displayDate, selectedDate)) {
									classes.push('selected');
								}
							}

							return (
								<td
									className={classes.join(' ')}
									onClick={() => {
										if (displayDate) {
											handleDayClick(displayDate);
										}
									}}
								>{displayDate ? displayDate.getDate() : ''}</td>
							);
						})}
					</tr>
				)}
				</tbody>
			</table>
		</div>
	);
};

export default CustomCalendar;


