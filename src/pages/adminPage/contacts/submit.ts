import { $host } from "../../../api";

interface FormValues {
	phone: string;
	secondPhone: string;
	email: string;
}

export async function submitForm(values: FormValues) {
	const { phone, secondPhone, email } = values;
	try {
		const response = await $host.patch("/info/contact/update", {
			phone: phoneFormat(phone),
			secondPhone: phoneFormat(secondPhone),
			email: email,
		});
		const data = response.data;
		console.log(data);

		return data;
	} catch (error) {
		console.error("Error updating data", error);
		return null;
	}
}

function phoneFormat(phone: string) {
	const numders = phone.split("");

	let changedPhone: string = "";
	if (numders[0] == "0") {
		changedPhone = ["3", "8", ...numders].join("");
	}
	return changedPhone;
}
