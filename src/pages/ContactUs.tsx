import Typography from "../components/Typography/Typography.tsx";
import { useMedia } from "../hooks/useMedia.tsx";


const ContactUs = () => {

	const {isMobile, isTablet} = useMedia()
	return (
		<>
			<div
				className={"min-w-[230px] h-[240px] lg:h-[290px]"}
				style={{
					backgroundImage: isMobile ? "url(/images/contact-320w.svg)" : isTablet ?  "url(/images/contact-720w.svg)" : "url(/images/contact-1440w.svg)",
					backgroundSize: "cover",
				}}>
				<Typography variant={"h2"} component={"h2"} className={"text-white"}>Зв'язатись з нами</Typography>
			</div>
		</>
	);
};

export default ContactUs;