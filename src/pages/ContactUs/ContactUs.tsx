import Typography from "../../components/Typography/Typography.tsx";
import { useMedia } from "../../hooks/useMedia.tsx";
import { MdEmail, MdPhone } from "react-icons/md";
import Section from "../../components/Section/Section.tsx";
import Container from "../../components/Container/Container.tsx";
import ContactUsForm from "./ContactUsForm.tsx";
import { useContacts } from "../../hooks/useContacts.ts";

const ContactUs = () => {
	const { isMobile, isTablet, isDesktop } = useMedia();
	const contacts = useContacts();

	return (
		<>
			<div
				style={{
					backgroundImage: isMobile
						? "url(/images/contact-320w.jpeg)"
						: isTablet
						? "url(/images/contact-768w.jpeg)"
						: "url(/images/contact-1440w.jpeg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Container
					className={
						"min-w-[230px] h-[240px] lg:h-[290px] flex flex-col justify-end"
					}
				>
					<Typography
						variant={isDesktop ? "h1" : "h2"}
						component={isDesktop ? "h1" : "h2"}
						className={"text-white w-[209px] mb-7 md:w-full "}
					>
						Зв'язатись з нами
					</Typography>
				</Container>
			</div>

			<Section>
				<div className={"contact-info md:gap-[26px] lg:gap-[30px] "}>
					<div className={"md:w-[150px] lg:w-[295px]"}>
						<Typography
							variant={isDesktop ? "h4" : "h5"}
							component={isDesktop ? "h4" : "h5"}
						>
							Ми завжди на зв’язку
						</Typography>
					</div>
					<ul className={"text-black text-[18px] leading-7 font-light"}>
						<li>
							<MdPhone size={24} />
							<p>+{contacts?.firstPhoneNumber}</p>
						</li>
						<li>
							<MdPhone size={24} />
							<p>+{contacts?.secondPhoneNumber}</p>
						</li>
						<li>
							<MdEmail size={24} />
							<p>{contacts?.email}</p>
						</li>
					</ul>
				</div>
				<ContactUsForm />
			</Section>
		</>
	);
};

export default ContactUs;
