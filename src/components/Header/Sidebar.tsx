import { FC } from "react";
import NavigationLink from "../Links/NavigationLink";
import Link from "../Links/Link";

interface SidebarProps {
	toggleMenu: () => void;
}

const Sidebar: FC<SidebarProps> = ({ toggleMenu }) => {
	return (
		<div className="bg-yellow100 w-[320px] text-black h-[506px] p-4 z-[51] ">
			<div className="flex flex-col items-end gap-4 mb-11">
				<div className="h-[48px] w-[48px] bg-black rounded-md">
					<img
						src="./images/close.svg"
						className="hover:cursor-pointer"
						onClick={toggleMenu}
					/>
				</div>
				<nav className="flex flex-col gap-9 w-full text-black text-lg font-[300]">
					<li
						className="border-b border-black w-full list-none pt-4  pb-4 hover:cursor-pointer "
						onClick={toggleMenu}
					>
						<NavigationLink to="aboutus" variant="underlineSideBar">
							Про нас
						</NavigationLink>
					</li>
					<li
						className="border-b  border-black w-full list-none pt-4  pb-4 hover:cursor-pointer "
						onClick={toggleMenu}
					>
						<NavigationLink to="search" variant="underlineSideBar">
							Проєкти
						</NavigationLink>
					</li>
					<li
						className="border-b  border-black w-full list-none pt-4  pb-4 hover:cursor-pointer "
						onClick={toggleMenu}
					>
						<NavigationLink to="contact" variant="underlineSideBar">
							Контакти
						</NavigationLink>
					</li>
				</nav>
			</div>
			<div className="flex justify-center items-center">
				<Link
					to="https://secure.wayforpay.com/button/b004f79dab8cb"
					variant="primary"
					className="w-full h-[48px] leading-7 text-[18px]"
				>
					Підтримати
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
