import { useEffect, useState } from "react";
import { ContactsType, getContacts } from "../api/ContactsAPI";

export const useContacts = () => {
	const [contacts, setContacts] = useState<ContactsType>();
	useEffect(() => {
		getContacts().then((data) => {
			setContacts(data);
		});
	}, []);
	return contacts;
};
