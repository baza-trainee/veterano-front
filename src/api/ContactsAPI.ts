import { $host } from "./index.ts";

export interface ContactsType {
	firstPhoneNumber: string;
	secondPhoneNumber: string;
	email: string;
}

export const getContacts = async () => {
	try {
		const { data } = await $host.get("/search/all-contacts");
		return data;
	} catch (e) {
		console.error("Error getting cards:", e);
		return null;
	}
};
