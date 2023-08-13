import { FC } from "react";
import { LinkPropsType } from "../interfaces/Interfaces.ts";
import { variantClassNames, sizeClassNames } from "../constans/const.ts";

const Link: FC<LinkPropsType> = ({
	to,
	variant = "underlineFooter",
	children,
	size,
	disabled,
	className,
	...props
}) => {
	const linkSizeClass = size ? sizeClassNames[size] : "";
	const variantStyles = variantClassNames[variant] || "";

	let variantClassName = "";
	if (typeof variantStyles === "string") {
		variantClassName = variantStyles;
	} else if (disabled) {
		variantClassName = variantStyles?.disabled || "";
	} else {
		variantClassName = variantStyles?.active || "";
	}

	return (
		<>
			<a
				href={to}
				className={`${variantClassName} ${linkSizeClass} ${className} `}
				{...props}
			>
				{children}
			</a>
		</>
	);
};

export default Link;
