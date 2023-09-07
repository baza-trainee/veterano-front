import Container from "../Container/Container.tsx";
import Link from "../Links/Link.tsx";
import NavigationLink from "../Links/NavigationLink.tsx";
import { BsTelegram, BsLinkedin } from "react-icons/bs";
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
								sizes="(max-width: 480px) 135px, (max-width: 768px) 164px, (min-width: 769px) 172px"
								src="/images/logo-white-lg.svg"
								alt="Хист Лого"
								className={"mb-[55px] md:mb-[97px] lg:mb-[82px]"}
							/>
							{isMobile ? (
								<Link
									to="https://secure.wayforpay.com/button/b004f79dab8cb"
									variant="secondary"
									size="wideMob"
									style={{ padding: "10px 32px" }}
								>
									Підтримати
								</Link>
							) : (
								<Link
									to="https://secure.wayforpay.com/button/b004f79dab8cb"
									variant="primaryDarkBg"
									style={{ padding: "10px 32px", height: "48px" }}
								>
									Підтримати
								</Link>
							)}
						</div>
						<div className={"footer-nav "}>
							<ul className="text-white">
								<li>
									<NavigationLink
										to={"/aboutus"}
										variant={"underlineNoneFooter"}
									>
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
										to={"/contact"}
										variant={"underlineNoneFooter"}
									>
										Контакти
									</NavigationLink>
								</li>
							</ul>
							<ul className={"lg:justify-self-start font-light "}>
								<li className={"text-white flex items-center leading-6"}>
									<img src="/images/phone.svg" alt='phone' />
									<p className={"pl-[10px]"}>+38 067 568 17 88</p>
								</li>
								<li className={"text-white flex items-center"}>
									<img src="/images/phone.svg" alt='phone' />
									<p className={"pl-[10px]"}>+38 063 628 66 30</p>
								</li>
								<li className={"text-white flex items-center"}>
									<img src="/images/mail.svg" alt='email' />
									<p className={"pl-[10px]"}>info@baza-trainee.tech</p>
								</li>
							</ul>
							<ul className={"md:self-center lg:self-start lg:mt-0 text-white"}>
								<li>
									<Link to={"/privacy"} variant={"underlineFooter"}>
										Політика конфіденційності
									</Link>
								</li>
								<li>
									<Link to={"/terms"} variant={"underlineFooter"}>
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
									<Link
										to={
											"https://www.linkedin.com/company/baza-trainee-ukraine/"
										}
										variant={"underlineFooter"}
									>
										<div className="group">
											<img
												src="./images/linkedin.svg"
												className="group-hover:hidden group-active:hidden"
											/>
											<img
												src="./images/linkedin-hover.svg"
												className="hidden group-hover:block group-active:hidden"
											/>
											<img
												src="./images/linkedin-focus.svg"
												className="hidden group-active:block "
											/>
										</div>
									</Link>

									<Link
										to={"https://t.me/+CBXkAJlsCy83ZDYy"}
										variant={"underlineFooter"}
										className="text-[#BCBCBC] hover:text-[#F9E1A1] active:text-[#151515]"
									>
										<BsTelegram size={35} />
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div
					className={
						"w-[212px]  text-white text-[12px] leading-4 font-light mt-6 md:w-full md:mt-[23px] lg:mt-[22px]"
					}
				>
					Розробка Baza Trainee Ukraine 2023 @ Всі права захищені
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
