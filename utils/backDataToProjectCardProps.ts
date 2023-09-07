import { Card } from "../src/api/types/SearchTypes";

export const convertBackDataToProjectCardProps = (data: Card[]) => {
	const tmp = data.map((elem: Card) => {
		return {
			text: elem.description,
			title: elem.title,
			imageSrc: `${import.meta.env.VITE_BASE_URL}/search/image/get?id=${
				elem.imageId
			}`,
			url: `${import.meta.env.VITE_BASE_URL}/url/redirect?id=${elem.url}`,
		};
	});
	return tmp;
};
