import { NavLink } from "react-router-dom";
import { FC, ReactNode } from "react";

type NavLinkAdminProps = {
	children: ReactNode,
	icon: string,
	to: string
}
const NavLinkAdmin: FC <NavLinkAdminProps> = ({children, icon, to}) => {
	return (
    
			<NavLink
				to={to}
				className={' w-full flex py-3 px-4 gap-3 border border-transparent rounded hover:border hover:border-black bg-inherit'}
				style={({ isActive }) => {
					return {
						backgroundColor: isActive ? "white" : "",
					};
				}}
			>
				<img src={icon} alt="folder"/>
				{children}
			</NavLink>

	);
};

export default NavLinkAdmin;