const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEK_DAYS_FROM_MONDAY: number[] = [6, 0, 1, 2, 3, 4, 5];

export enum Month {
	January = 0,
	February = 1,
	March = 2,
	April = 3,
	May = 4,
	June = 5,
	July = 6,
	August = 7,
	September = 8,
	October = 9,
	November = 10,
	December = 11
}

export function areEqual(a: Date | null, b: Date | null): boolean {
	if (!a || !b) return false;
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

export function isLeapYear(year: number): boolean {
	return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date: Date): number {
	const month = date.getMonth();
	const year = date.getFullYear();
	const daysInMonth = DAYS_IN_MONTH[month];

	if (isLeapYear(year) && month === Month.February) {
		return daysInMonth + 1;
	} else {
		return daysInMonth;
	}
}

export function getDayOfWeek(date: Date): number {
	const dayOfWeek = date.getDay();
	return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}

export function getMonthData(year: number, month: number): (Date | undefined)[][] {
	const result: (Date | undefined)[][] = [];
	const date = new Date(year, month, 1);
	const daysInMonth = getDaysInMonth(date);
	const monthStartsOn = getDayOfWeek(date);
	let day = 1;
	const previousMonthDays = new Date(year, month, 0).getDate();

	for (let i = 0; i < 6; i++) { // 6 рядків
		result[i] = [];

		for (let j = 0; j < DAYS_IN_WEEK; j++) {
			if (i === 0 && j < monthStartsOn) {
				result[i][j] = new Date(year, month - 1, previousMonthDays - monthStartsOn + j + 1);
			} else if (day > daysInMonth) {
				result[i][j] = new Date(year, month + 1, day++ - daysInMonth);
			} else {
				result[i][j] = new Date(year, month, day++);
			}
		}
	}

	return result;
}
