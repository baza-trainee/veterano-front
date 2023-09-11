import * as Yup from "yup";

export const validationSchema = Yup.object({
	title: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.max(100, "Поля повинні мати не більше 100 символів")
		.matches(/^[a-zA-Zа-яА-Я0-9()&, \-\p{L}]+$/u, 'Поле не повинно містити спеціальних символів')
		.required("Поле обов'язкове до заповнення"),
	url: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.required("Поле обов'язкове до заповнення"),
	description: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.max(255, "Поля повинні мати не більше 255 символів")
		.required("Поле обов'язкове до заповнення"),
	location: Yup.string()
		.min(2, "Поля повинні мати більше 2 символів")
		.matches(/^[a-zA-Zа-яА-Я0-9()&/, \-\p{L}]+$/u, 'Поле не повинно містити спеціальних символів')
		.test('hasCityAndCountry', 'Поле повинно містити місто / країну', value => {
			if (!value) return false;
			const parts = value.split('/');
			return parts.length === 2 && parts[0].trim() !== '' && parts[1].trim() !== '';
		})
		.required("Поле обов'язкове до заповнення"),
	image: Yup.mixed()
		.required("Поле обов'язкове до заповнення"),
	publication: Yup.string()
		.required("Поле обов'язкове до заповнення"),
	category: Yup.string()
		.matches(/^[a-zA-Zа-яА-Я0-9()&, \-\p{L}]+$/u, 'Поле не повинно містити спеціальних символів')
		.required("Поле обов'язкове до заповнення"),
});