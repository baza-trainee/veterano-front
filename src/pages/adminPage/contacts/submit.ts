import { $host } from "../../../api";
export async function submitForm(values: object) {
	try {
		const response = await $host.patch("/info/contact/update", values);
		const data = response.data;
		return data;
	} catch (error) {
		console.error("Error updating data", error);
		return null;
	}
}
