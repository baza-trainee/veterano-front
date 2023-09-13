import * as Yup from "yup";
import { images, publicationDate, title } from "../../../validationFields/validationFields.ts";

export const validationSchema = Yup.object({
	title: title,
	url: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.matches(/^(?!https?:\/\/)[a-zA-Z0-9.-]+\.[a-zA-Z-/]{2,}$/, "Поле повинно містити URL в форматі domain.com")
		.required("Поле обов'язкове до заповнення. Введіть посилання"),
	description: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.max(255, "Поля повинні мати не більше 255 символів")
		.required("Поле обов'язкове до заповнення"),
	location: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.max(50, "Введіть не більше 50 символів")
		.matches(/^[a-zA-Zа-яА-Я()&/, \-\p{L}]+$/u, "Поле не повинно містити спеціальних символів та цифр")
		.test("hasCityAndCountry", "Поле повинно містити місто / країну", value => {
			if (!value) return false;
			const parts = value.split("/");
			return parts.length === 2 && parts[0].trim() !== "" && parts[1].trim() !== "";
		})
		.required("Поле обов'язкове до заповнення"),
	image: images,
	publication: publicationDate,
	category: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.max(50, "Введіть не більше 30 символів")
		.matches(/^[a-zA-Zа-яА-Я0-9()&, \-\p{L}]+$/u, "Поле не повинно містити спеціальних символів")
		.required("Поле обов'язкове до заповнення"),
});