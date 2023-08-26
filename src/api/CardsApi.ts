import { $host } from "./index.ts";

interface CardType {
	title: string;
	description: string;
	image: string;
	url: string;
	categories: { categoryName: string }[]
	publication: string;
	location: {
		city: string;
		country: string;
	};
}

export const createCard = async ({
																	 title,
																	 description,
																	 image,
																	 url,
																	 categories,
																	 publication,
																	 location,
																 }: CardType) => {
	try {
		const { data } = await $host.post("card/add", {
			title,
			description,
			image,
			url,
			categories,
			publication,
			location,
		});
		return data;
	} catch (e) {
		console.error("Error creating feedback:", e);
		return null;
	}
};

export const getAllCards = async (currentPage: number) => {
	try {
		const { data } = await $host.get("card/get-all", {
			params: {
				page: currentPage,
				size: 7,
			},
		});
		return data;
	} catch (e) {
		console.error("Error creating feedback:", e);
		return null;
	}
};

export const getCardById = async (id: string) => {
	try {
		const { data } = await $host.get("card/get?id=" + id);
		return data;
	} catch (e) {
		console.error("Error creating feedback:", e);
		return null;
	}
};