import Container from "../components/Container/Container";
import NavigationLink from "../components/Links/NavigationLink";
import Typography from "../components/Typography/Typography";

export const ErrorPage = () => {
	return (
		<Container className="flex justify-center items-center flex-col p-4 min-h-[575px] text-[#313131]">
			<Typography
				variant="span"
				className=" text-[130px] font-extralight md:text-[170px] lg:text-[200px] leading-[130px] md:leading-[170px] lg:leading-[200px]"
			>
				404
			</Typography>
			<Typography
				variant="span"
				className="font-medium md:font-bolt text-lg mb-6 md:text-[32px] leading-[28px] md:leading-[40px]"
			>
				Сторінка не знайдена
			</Typography>
			<Typography
				variant="span"
				className=" text-base md:text-lg font-light text-center mb-9"
			>
				Ми не змогли знайти сторінку, яку Ви шукаєте. Можливо, сталася помилка
			</Typography>
			<NavigationLink
				className=" md:px-[0px] md:min-w-[288px] text-[18px]"
				to="/"
				variant="primary"
				size="wideMob"
			>
				Повернутись на головну
			</NavigationLink>
		</Container>
	);
};
