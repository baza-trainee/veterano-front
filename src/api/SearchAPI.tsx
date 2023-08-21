import { $host } from "./index.ts";

interface SearchRequestType{
	q: string,
	location: string,
	category: string
}
export const searchRequest = async ({q, location, category}: SearchRequestType) => {
	try{
		const {data} = await $host.get('search/card', {
			params: {
				q,
				location,
				category
			}
		})
		return [data]
	} catch (e) {
		console.error('Error:', e);
		return null;
	}
}

export const getCategoryList = async () => {
	try{
		const {data} = await $host.get('search/all-categories')
		return [data]
	} catch (e) {
		console.error('Error:', e);
		return null;
	}
}
