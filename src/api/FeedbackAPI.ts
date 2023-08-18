import { $host } from "./index.ts";

interface CreateFeedbackType{
	name: string,
	email: string,
	message: string
}
export const createFeedback = async ({name, email, message}: CreateFeedbackType) => {
	try{
		const {data} = await $host.post('feedback/add', {
			name,
			email,
			message
		})
		return [data]
	} catch (e) {
		console.error('Error creating feedback:', e);
		return null;
	}
}