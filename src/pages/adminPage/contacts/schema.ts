import * as Yup from "yup";

import {
	emailValidationSchema,
	phoneNumberRegExp,
} from "../../../validationFields/validationFields";

export const validationSchema = Yup.object({
	phone: Yup.string()
		.matches(phoneNumberRegExp, "Введіть номер у форматі +380 ### ### ####")
		.required("Обов'язкове поле"),

	secondPhone: Yup.string()
		.matches(phoneNumberRegExp, "Введіть номер у форматі +380 ### ### ####")
		.required("Обов'язкове поле"),

	email: emailValidationSchema,
});
