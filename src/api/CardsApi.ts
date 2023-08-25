import { $host } from "./index.ts";



export const getAllCards = async (currentPage: number) => {
	try{
		const {data} = await $host.get('card/get-all', {
			params: {
				page: currentPage,
				size: 7
			}
		})
		return data
	} catch (e) {
		console.error('Error creating feedback:', e);
		return null;
	}
}