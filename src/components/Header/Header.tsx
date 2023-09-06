import React, { useEffect, useState } from "react";
import Container from "../Container/Container.tsx";
import Link from "../Links/Link";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflowY = "auto";
		}
	}, [isOpen]);

	return (
		<header className="bg-yellow100 ">
			<Container className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center relative">
				<div className="flex items-center">
					<div className="flex gap-[20px] items-center">
						<div
							className=" sm:hidden md:block hover:cursor-pointer"
							onClick={toggleMenu}
						>
							<img src="./images/burger-menu.svg" />
						</div>
						<NavLink to="/">
							<img
								className="h-[30px] w-[135px] md:w-[164px] md:h-[36px] lg:h-[37px] lg:w-[172px] mr-2 hover:cursor-pointer"
								src="/images/logo-black.svg"
								alt="Logo"
							/>
						</NavLink>
					</div>
				</div>
				<div className="md:hidden">
					{!isOpen && (
						<div
							className="hover:cursor-pointer   block md:hidden"
							onClick={toggleMenu}
						>
							<img src="./images/burger-menu.svg" />
						</div>
					)}
				</div>

				<div className="hidden md:flex">
					<Link
						to="https://secure.wayforpay.com/button/b004f79dab8cb"
						variant="primary"
						size="large"
					>
						Підтримати
					</Link>
				</div>
				{isOpen && <Backdrop isOpen={isOpen} onClose={toggleMenu} />}
			</Container>
			{isOpen && (
				<div className="absolute top-0 left-0 w-full md:w-[320px] z-20 duration-500 transition-all">
					<Sidebar toggleMenu={toggleMenu} />
				</div>
			)}
		</header>
	);
};

export default Header;
