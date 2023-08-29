import { $host } from "./index.ts";

interface CardType {
	cardId?: number;
	title: string;
	description: string;
	image: string;
	url: string;
	categories: { categoryName: string }[];
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
		console.error("Error creating card:", e);
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
		console.error("Error getting cards:", e);
		return null;
	}
};

export const getCardById = async (id: string) => {
	try {
		const { data } = await $host.get("card/get?id=" + id);
		return data;
	} catch (e) {
		console.error("Error getting card:", e);
		return null;
	}
};

export const getCardImage = async (id: number) => {
	try {
		const { data } = await $host.get("search/image/get?id=" + id);
		const formattedImage = formatImageBinary(data);

		return formattedImage;
	} catch (e) {
		console.error("Error getting image:", e);
		return null;
	}
};

const formatImageBinary = (binaryString: string): string => {
	const arrayBuffer = new Uint8Array(binaryString.split('').map(char => char.charCodeAt(0)));
	const blob = new Blob([arrayBuffer], { type: "image/png" });
	return URL.createObjectURL(blob);
};


export const editCard = async (card: CardType) => {
	try {
		const { data } = await $host.patch("card/update", card);
		return data;
	} catch (e) {
		console.error("Error editing card:", e);
		return null;
	}
};

export const removeCard = async (cardId : number) => {
	try {
		const { data } = await $host.delete("card/delete?id=" + cardId);
		return data;
	} catch (e) {
		console.error("Error deleting card:", e);
		return null;
	}
};

export const removeCheckedCards = async (cardIds: number[]) => {
	try {
		await Promise.all(
			cardIds.map(cardId => $host.delete("card/delete?id=" + cardId))
		);
	} catch (e) {
		console.error("Error deleting card:", e);
		return null;
	}
};
