import { Card } from "../src/api/types/SearchTypes";

export const convertBackDataToProjectCardProps = (data: Card[]) => {
	const tmp = data.map((elem: Card) => {
		return {
			text: elem.description,
			title: elem.title,
			imageSrc: `http://45.94.157.117:8080/api/v1/search/image/get?id=${elem.imageId}`,
		};
	});
	return tmp;
};
