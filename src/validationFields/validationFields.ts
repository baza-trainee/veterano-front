import * as Yup from "yup";
export const phoneNumberRegExp =
	/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}[ \-]*[0-9]{3,4}$/;

export const emailValidationSchema = Yup.string()
	.email("Введіть дійсний email")
	.test("domain", "Корабель там 🖕", (value) => {
		return !value?.endsWith(".ru") && !value?.endsWith(".by");
	})
	.matches(
		/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		"Введіть дійсний email"
	)
	.required("Введіть дійсний email");

export const nameValidationSchema = Yup.string()
	.min(2, "Поля повинні мати більше 2 символів")
	.max(30, "Ім’я повинно бути не більше 30 знаків")
	.matches(/^[a-zA-Z\u0400-\u04FF\s]*$/, "Тільки літери та пробіли дозволені")
	.test("no-only-spaces", "Ім'я повинно містити літери", (value) => {
		return !/^\s+$/.test(value!);
	})
	.required("Заповніть пусте поле");
export const passwordValidationSchema = Yup.string()
	.min(8, "Поля повинні мати більше 2 символів")
	.max(52, "Ім’я повинно бути не більше 52 знаків")
	.required("Заповніть пусте поле");

export const title = Yup.string()
	.min(2, "Поля повинні мати більше 2 символів")
	.max(100, "Поля повинні мати не більше 100 символів")
	.matches(
		/^[0-9a-zA-Zа-яА-Я-()& \-\p{L}]+$/u,
		"Поле не повинно містити спеціальних символів"
	)
	.required("Поле обов'язкове до заповнення. Введіть назву");

export const images = Yup.mixed().required("Поле обов'язкове до заповнення");

export const publicationDate = Yup.mixed()
	.required("Поле обов'язкове до заповнення")

export const urls = Yup.string()
	.min(2, "Поля повинні мати більше 2 символів")
	.matches(/^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z-/]{2,}$/, "Поле повинно містити URL в форматі https://domain.com")
	.required("Поле обов'язкове до заповнення. Введіть посилання")
