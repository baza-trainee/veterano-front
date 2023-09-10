import { NavLink } from "react-router-dom";
import { FC } from "react";
import { LinkPropsType } from "./interfaces/Interfaces.ts";
import { variantClassNames, sizeClassNames } from "./constans/const.ts";

const NavigationLink: FC<LinkPropsType> = ({
	to,
	variant = "underlineFooter",
	children,
	size,
	disabled,
	className,
	...props
}) => {
	const NavLinkClass = size ? sizeClassNames[size] : "";
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
			<NavLink
				to={to}
				className={
					`h-[48px] md:px-[32px] ${variantClassName} ${NavLinkClass}` +
					" " +
					className
				}
				style={({ isActive }) => ({
					fontWeight: isActive ? "bold" : "",
					cursor: isActive ? "default" : "",
					pointerEvents: isActive ? "none" : undefined,
				})}
				{...props}
			>
				{children}
			</NavLink>
		</>
	);
};

export default NavigationLink;
