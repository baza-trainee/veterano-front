import React, { useEffect, useState } from "react";
import Container from "../Container/Container.tsx";
import { GiHamburgerMenu } from "react-icons/Gi";
import Link from "../Links/Link";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isOpen]);

	return (
		<header className="bg-yellow100 ">
			<Container className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center relative">
				<div className="flex items-center">
					<div className="flex gap-2 items-center">
						<div className=" sm:hidden md:block">
							<GiHamburgerMenu
								className="text-black w-8 h-8 hover:cursor-pointer"
								onClick={toggleMenu}
							/>
						</div>
						<img
							className="h-[30px] w-[135px] mr-2 hover:cursor-pointer"
							src="./images/Logo-black.svg"
							alt="Logo"
						/>
					</div>
				</div>
				<div className="md:hidden">
					{!isOpen && (
						<GiHamburgerMenu
							className="text-black w-8 h-8 hover:cursor-pointer block md:hidden"
							onClick={toggleMenu}
						/>
					)}
				</div>
				{isOpen && (
					<div className="absolute top-0 left-0 w-full md:w-[320px] z-20 duration-500 transition-all">
						<Sidebar toggleMenu={toggleMenu} />
					</div>
				)}

				<div className=" hidden md:flex">
					<Link to="my offer" variant="primary" size="large">
						Підтримати
					</Link>
				</div>
				{isOpen && <Backdrop isOpen={isOpen} onClose={toggleMenu} />}
			</Container>
		</header>
	);
};

export default Header;