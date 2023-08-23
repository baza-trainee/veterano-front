export interface SearchRes {
	cards: Card[];
}
export interface Card {
	description: string;
	title: string;
	url: string;
	imageId: number;
	publication: string;
	categories: Category[];
	location: Location;
}
export interface Category {
	categoryName: "string";
}
export interface Location {
	country: "string";
	city: "string";
}
