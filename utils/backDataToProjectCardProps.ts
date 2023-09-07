import path from "path";
import { Card } from "../src/api/types/SearchTypes";

export const convertBackDataToProjectCardProps = (data: Card[]) => {
	const tmp = data.map((elem: Card) => {
		return {
			text: elem.description,
			title: elem.title,
			imageSrc: path.join(
				import.meta.env.VITE_BASE_URL,
				`/search/image/get?id=${elem.imageId}`
			),
			url: path.join(
				import.meta.env.VITE_BASE_URL,
				`/search/image/get?id=${elem.url}`
			),
		};
	});
	return tmp;
};
