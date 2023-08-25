import { $host } from "./index.ts";

export const getAllCards = async () => {
	try{
		const {data} = await $host.get('card/get-all')
		return data
	} catch (e) {
		console.error('Error creating feedback:', e);
		return null;
	}
}