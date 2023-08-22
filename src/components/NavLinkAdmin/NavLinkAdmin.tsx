import { NavLink } from "react-router-dom";
import { FC, ReactNode } from "react";

type NavLinkAdminProps = {
	children: ReactNode,
	icon: string,
	to: string
}
const NavLinkAdmin: FC <NavLinkAdminProps> = ({children, icon, to}) => {
	return (

<div className={'w-[200px] py-6 bg-red-400'}>
	<NavLink
		to={to}
		className={' w-full flex py-3 px-4 gap-3 border border-transparent rounded hover:border hover:border-black bg-inherit hov'}
		style={({ isActive }) => {
			return {
				backgroundColor: isActive ? "white" : "",
			};
		}}
	>
		<img src={icon} alt="folder"/>
		{children}
	</NavLink>
</div>
	);
};

export default NavLinkAdmin;