import { ReactNode } from "react";

export interface LinkPropsType {
	children?: ReactNode;
	to: string;
	variant:
		| "primary"
		| "primaryDarkBg"
		| "secondary"
		| "underlineFooter"
		| "underlineNoneFooter"
		| "underlineSideBar"
		| "underlineNoneSideBar";
	size?: "small" | "large" | "wideMob";
	disabled?: boolean;
}

export type sizeClassType = {
	small: string;
	large: string;
	wideMob: string;
};
