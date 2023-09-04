import { $host } from "./index.ts";

interface SearchRequestType {
	q?: string | null;
	city?: string | null;
	country?: string | null;
	category?: string | null;
	page?: number | null;
	size?: number | null;
}
export const searchRequest = async ({
	q,
	city,
	country,
	category,
	page,
	size,
}: SearchRequestType) => {
	try {
		const { data } = await $host.get("search/card", {
			params: {
				q,
				city,
				country,
				category,
				page,
				size,
			},
		});
		return data;
	} catch (e) {
		console.error("Error:", e);
		return null;
	}
};

export const getCategoryList = async () => {
	try {
		const { data } = await $host.get("search/all-categories");
		return data;
	} catch (e) {
		console.error("Error:", e);
		return null;
	}
};

export const getCitiesList = async () => {
	try {
		const { data } = await $host.get("search/all-countries");
		return data;
	} catch (e) {
		console.error("Error:", e);
		return null;
	}
};

export const getCardImage = async (id: string) => {
	try {
		const { data } = await $host.get("search/image/get", { params: { id } });
		return data;
	} catch (e) {
		console.error("Error:", e);
		return null;
	}
};

export const searchPartners = async () => {
	try {
		const { data } = await $host.get("search/all-partners", {
			params:{
				page:1,
				size: 20
			}
		})
		return data;
	} catch (e) {
		console.error("Error:", e);
		return null;
	}

}
