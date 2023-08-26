import * as Yup from "yup";

export const validationSchema = Yup.object({
	title: Yup.string()
		.required("Поле обов'язкове до заповнення"),
	url: Yup.string()
		.required("Поле обов'язкове до заповнення"),
	description: Yup.string()
		.required("Поле обов'язкове до заповнення"),
	city: Yup.string()
		.required("Місто та країна обовязкове"),
	country: Yup.string()
		.required("Місто та країна обовязкове"),
	image: Yup.mixed()
		.required("Поле обов'язкове до заповнення"),
	publication: Yup.string()
		.required("Поле обов'язкове до заповнення"),
	category: Yup.string()
		.required("Поле обов'язкове до заповнення"),
});