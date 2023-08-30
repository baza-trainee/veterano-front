import { $host } from "../../../api/index.ts";

interface FormPropertis {
	firstPhone: string;
	secondPhone: string;
	email: string;
}

export const submitForm = async ({
	firstPhone,
	secondPhone,
	email,
}: FormPropertis) => {
	try {
		const requestData = {
			firstPhoneNumber: firstPhone,
			secondPhoneNumber: secondPhone,
			email: email,
		};

		const response = await $host.patch("/info/contact/update", requestData);
		const data = response.data;
		console.log(data);

		return data;
	} catch (error) {
		console.error("Error updating data", error);
		return null;
	}
};
