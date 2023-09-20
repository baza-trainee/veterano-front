import { $host } from "./index.ts";

interface CardType {
	cardId?: number;
	title?: string;
	description?: string;
	image?: string;
	url?: string;
	categories?: { categoryName: string }[];
	publication?: string;
	location?: {
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

export const getAllCards = async (currentPage: number, size: number) => {
	try {
		const { data } = await $host.get("card/get-all", {
			headers: { Authorization: `Bearer ${sessionStorage.getItem("JWT")}` },
			params: {
				page: currentPage,
				size: size,
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
		const { data } = await $host.get("card/get?id=" + id, {
			headers: { Authorization: `Bearer ${sessionStorage.getItem("JWT")}` },
		});
		return data;
	} catch (e) {
		console.error("Error getting card:", e);
		return null;
	}
};

export const editCard = async (card: CardType) => {
	try {
		const { data } = await $host.patch("card/update", card, {
			headers: { Authorization: `Bearer ${sessionStorage.getItem("JWT")}` },
		});
		return data;
	} catch (e) {
		console.error("Error editing card:", e);
		return null;
	}
};

export const removeCard = async (cardId: number) => {
	try {
		const { data } = await $host.delete("card/delete?id=" + cardId, {
			headers: { Authorization: `Bearer ${sessionStorage.getItem("JWT")}` },
		});
		return data;
	} catch (e) {
		console.error("Error deleting card:", e);
		return null;
	}
};

export const removeCheckedCards = async (cardIds: number[]): Promise<void> => {
	try {
		await Promise.all(
			cardIds.map((cardId) =>
				$host.delete("card/delete?id=" + cardId, {
					headers: { Authorization: `Bearer ${sessionStorage.getItem("JWT")}` },
				})
			)
		);
	} catch (e) {
		console.error("Error deleting card:", e);
		return;
	}
};

export const getAllCategories = async () => {
	try {
		const { data } = await $host.get("card/all-categories", {
			headers: { Authorization: `Bearer ${sessionStorage.getItem("JWT")}` },
		});
		return data;
	} catch (e) {
		console.error("Error:", e);
		return null;
	}
};
