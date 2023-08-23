import { ReactNode } from "react";

export interface LinkPropsType {
	children?: ReactNode;
	to: string;
	variant:
		| "primary"
		| "primaryDarkBg"
		| "secondary"
		| "secondaryDarkBg"
		| "underlineFooter"
		| "underlineNoneFooter"
		| "underlineSideBar"
		| "underlineNoneSideBar";
	size?: "small" | "large" | "wideMob";
	disabled?: boolean;
	style?: React.CSSProperties,
	className?: string
}

export type sizeClassType = {
	small: string;
	large: string;
	wideMob: string;
};
