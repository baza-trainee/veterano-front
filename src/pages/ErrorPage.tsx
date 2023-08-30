import Container from "../components/Container/Container";
import NavigationLink from "../components/Links/NavigationLink";
import Typography from "../components/Typography/Typography";

export const ErrorPage = () => {
	return (
		<Container className="flex justify-center items-center flex-col p-4 min-h-[575px]">
			<Typography
				variant="span"
				className="text-grey100 text-[130px] font-extralight md:text-[170px] lg:text-[200px]"
			>
				404
			</Typography>
			<Typography
				variant="span"
				className="font-medium text-black text-lg mb-6 md:text-[32px] md:text-bold md:mt-[-30px]"
			>
				Сторінка не знайдена
			</Typography>
			<Typography
				variant="span"
				className="text-grey100 text-base md:text-lg  font-light text-center leading-6 mb-9"
			>
				Ми не змогли знайти сторінку, яку Ви шукаєте. Можливо, сталася помилка
			</Typography>
			<NavigationLink to="/" variant="primary" size="large">
				Повернутись на головну
			</NavigationLink>
		</Container>
	);
};
