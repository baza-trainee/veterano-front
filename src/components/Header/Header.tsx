import React, { useState } from "react";
import Container from "../Container";
import { GiHamburgerMenu } from "react-icons/Gi";
import Link from "../Link";

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className="bg-yellow100">
			<Container>
				<div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
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
						<GiHamburgerMenu
							className="text-black w-8 h-8 hover:cursor-pointer"
							onClick={toggleMenu}
						/>
					</div>
					{/* <nav
						className={`md:block ${isOpen ? "block" : "hidden"} mt-4 md:mt-0`}
					>
						<a
							href="#"
							className="text-gray-300 hover:text-white px-3 py-2 md:inline-block"
						>
							Home
						</a>
					</nav> */}

					<Link
						to="my offer"
						variant="primary"
						size="large"
						className="hidden md:flex"
					>
						Детальніше
					</Link>
				</div>
			</Container>
		</header>
	);
};

export default Header;
