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

// export const getAllPartners = async (currentPage: number, size: number) => {
// 	try {
// 		const { data } = await $host.get("info/partner/get-all", {
// 			params: {
// 				page: currentPage,
// 				size: size,
// 			},
// 		});
// 		return data;
// 	} catch (e) {
// 		console.error("Error getting cards:", e);
// 		return null;
// 	}
// };

export const getAllPartners = async () => {
	try {
		const { data } = await $host.get("info/partner/get-all");
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

export const editPartner = async (partner: PartnerType) => {
	try {
		const { data } = await $host.patch("info/partner/update", partner);
		return data;
	} catch (e) {
		console.error("Error editing card:", e);
		return null;
	}
};

export const removePartner = async (id: number) => {
	try {
		const { data } = await $host.delete("info/partner/delete?id=" + id);
		return data;
	} catch (e) {
		console.error("Error deleting card:", e);
		return null;
	}
};

export const removeCheckedPartners = async (ids: number[]) => {
	try {
		await Promise.all(
			ids.map(id => $host.delete("info/partner/delete?id=" + id)),
		);
	} catch (e) {
		console.error("Error deleting card:", e);
		return null;
	}
};