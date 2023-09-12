import { $host } from "../../../api";
import { getContacts } from "../../../api/ContactsAPI";

interface FormValues {
	phone: string;
	secondPhone: string;
	email: string;
}

export async function submitForm(values: FormValues) {
	const { phone, secondPhone, email } = values;
	try {
		await $host.patch("/info/contact/update", {
			firstPhoneNumber: phoneFormat(phone),
			secondPhoneNumber: phoneFormat(secondPhone),
			email: email,
		});
		const data = await getContacts();
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
	} else if (numders[0] == "+") {
		changedPhone = numders.slice(1).join("");
	}
	return changedPhone;
}
