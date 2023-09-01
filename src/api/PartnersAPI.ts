import { $host } from "./index.ts";

interface PartnerType{
	id?: number,
	partnerName: string,
	image: string,
	url: string,
	publication: string,
	isEnabled: boolean
}

export const createPartner = async ({ partnerName, image, url, publication, isEnabled }: PartnerType) => {
	try {
		const { data } = await $host.post("info/partner/add", {
			partnerName,
			image,
			url,
			publication,
			isEnabled
		});
		return data;
	} catch (e) {
		console.error("Error creating card:", e);
		return null;
	}
};

export const getAllPartners = async (currentPage: number, size: number) => {
	try {
		const { data } = await $host.get("info/partner/get-all", {
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

export const getPartnerById = async (id: number) => {
	try {
		const { data } = await $host.get("info/partner/get?id=" + id);
		return data;
	} catch (e) {
		console.error("Error getting card:", e);
		return null;
	}
};

export const getPartnerImage = async (id: number) => {
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
	const arrayBuffer = new Uint8Array(binaryString.split("").map(char => char.charCodeAt(0)));
	const blob = new Blob([arrayBuffer], { type: "image/png" });
	return URL.createObjectURL(blob);
};


export const editPartner = async (partner: PartnerType) => {
	try {
		const { data } = await $host.patch("info/partner/update", partner);
		return data;
	} catch (e) {
		console.error("Error editing card:", e);
		return null;
	}
};

export const removePartner = async (cardId: number) => {
	try {
		const { data } = await $host.delete("info/partner/delete?id=" + cardId);
		return data;
	} catch (e) {
		console.error("Error deleting card:", e);
		return null;
	}
};

export const removeCheckedPartners = async (cardIds: number[]) => {
	try {
		await Promise.all(
			cardIds.map(cardId => $host.delete("info/partner/delete?id=" + cardId)),
		);
	} catch (e) {
		console.error("Error deleting card:", e);
		return null;
	}
};