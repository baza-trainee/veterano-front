import * as Yup from "yup";
///phone number
export const phoneNumberRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

///email
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

///name
export const name = Yup.string()
	.min(2, "Поля повинні мати більше 2 символів")
	.max(30, "Ім’я повинно бути не більше 30 знаків")
	.matches(/^[a-zA-Z\u0400-\u04FF\s]*$/, "Тільки літери та пробіли дозволені")
	.test("no-only-spaces", "Ім'я повинно містити літери", (value) => {
		return !/^\s+$/.test(value!);
	})
	.required("Заповніть пусте поле");
