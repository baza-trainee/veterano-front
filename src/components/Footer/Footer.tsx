import Container from "../Container/Container.tsx";
import Link from "../Links/Link.tsx";
import NavigationLink from "../Links/NavigationLink.tsx";
import { BsFacebook, BsTelegram } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
	const isMobile = useMediaQuery({
		query: "(max-width: 480px)",
	});

	return (
		<footer
			className={
				"bg-[#313131] pb-[70px] md:pb-[35px] lg:pb-[38px] md:h-[361px]"
			}
		>
			<Container className={"flex flex-col"}>
				<div className={"wrapper"}>
					<div className="footer ">
						<div className="footer-info">
							<img
								srcSet="/images/logo-white-sm.svg 135w, /images/logo-white-md.svg 164w, /images/logo-white-lg.svg 172w"
								sizes="(max-width: 480px) 135px, (max-width: 769px) 164px, (min-width: 769px) 172px"
								src="/images/logo-white-lg.svg"
								alt="Хист Лого"
								className={"mb-[55px] md:mb-[97px] lg:mb-[82px]"}
							/>
							{isMobile ? (
								<Link to="/" variant="secondary" size="wideMob">
									Підтримати
								</Link>
							) : (
								<Link to="/" variant="primaryDarkBg">
									Підтримати
								</Link>
							)}
						</div>
						<div className={"footer-nav "}>
							<ul className="text-white">
								<li>
									<NavigationLink to={"/about"} variant={"underlineNoneFooter"}>
										Про нас
									</NavigationLink>
								</li>
								<li>
									<NavigationLink
										to={"/search"}
										variant={"underlineNoneFooter"}
									>
										Проєкти
									</NavigationLink>
								</li>
								<li>
									<NavigationLink
										to={"/contacts"}
										variant={"underlineNoneFooter"}
									>
										Контакти
									</NavigationLink>
								</li>
							</ul>
							<ul className={"lg:justify-self-start "}>
								<li className={"text-white flex items-center leading-6"}>
									<FaPhoneAlt size={24} color={"white"} />
									<p className={"pl-[10px]"}>+38 044 XXX XX XX</p>
								</li>
								<li className={"text-white flex items-center"}>
									<FaPhoneAlt size={24} color={"white"} />
									<p className={"pl-[10px]"}>+38 044 XXX XX XX</p>
								</li>
								<li className={"text-white flex items-center"}>
									<MdEmail size={24} color={"white"} />
									<p className={"pl-[10px]"}>info@baza-trainee.tech</p>
								</li>
							</ul>
							<ul className={"md:self-center lg:self-start lg:mt-0 text-white"}>
								<li>
									<Link
										to={"/public/files/pol_conf.pdf"}
										variant={"underlineFooter"}
									>
										Політика конфіденційності
									</Link>
								</li>
								<li>
									<Link
										to={"/public/files/site_rules.pdf"}
										variant={"underlineFooter"}
									>
										Правила користування сайтом
									</Link>
								</li>
							</ul>
							<ul
								className={
									"lg:col-start-3 md:justify-self-end lg:justify-self-start md:self-center lg:self-start "
								}
							>
								<li className={"social-icons "}>
									<Link to={"/#"} variant={"underlineFooter"}>
										<BsFacebook color={"#BCBCBC"} size={42} />
									</Link>

									<Link to={"/#"} variant={"underlineFooter"}>
										<BsTelegram color={"#BCBCBC"} size={42} />
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div
					className={
						"text-white text-[12px] ml-4 md:ml-[27px] lg:ml-[80px] mt-4 md:mt-6 lg:mt-[22px] leading-4 w-[212px] md:w-full sm:mt-[22px]"
					}
				>
					Розробка Baza Trainee Ukraine 2023 @ Всі права захищені
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
