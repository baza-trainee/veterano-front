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
	phone[0] === "+" && (phone = phone.slice(1));
	if (phone[0] === "0") {
		phone = "38" + phone;
	}
	return phone;
}
