import * as Yup from "yup";

export const validationSchema = Yup.object({
	title: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.required("Поле обов'язкове до заповнення"),
	url: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.required("Поле обов'язкове до заповнення"),
	description: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.required("Поле обов'язкове до заповнення"),
	city: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.required("Місто та країна обовязкове"),
	country: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.required("Місто та країна обовязкове"),
	image: Yup.mixed()
		.required("Поле обов'язкове до заповнення"),
	publication: Yup.string()
		.required("Поле обов'язкове до заповнення"),
	category: Yup.string()
		.required("Поле обов'язкове до заповнення"),
});