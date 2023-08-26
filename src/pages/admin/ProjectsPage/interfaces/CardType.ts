export interface CardType {
	cardId: number
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
	isEnabled: boolean;
	imageId: number
}