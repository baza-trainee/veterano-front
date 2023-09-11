import * as Yup from "yup";

import {
	emailValidationSchema,
	phoneNumberRegExp,
} from "../../../validationFields/validationFields";

export const validationSchema = Yup.object({
	phone: Yup.string()
		.matches(phoneNumberRegExp, "Некоректний номер телефону")
		.required("Обов'язкове поле"),

	secondPhone: Yup.string()
		.matches(phoneNumberRegExp, "Некоректний номер телефону")
		.required("Обов'язкове поле"),

	email: emailValidationSchema,
});
