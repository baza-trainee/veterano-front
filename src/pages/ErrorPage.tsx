import Container from "../components/Container/Container";
import NavigationLink from "../components/Links/NavigationLink";
import Typography from "../components/Typography/Typography";

export const ErrorPage = () => {
	return (
		<Container className="flex justify-center items-center flex-col p-4 min-h-[575px]">
			<Typography
				variant="span"
				className="text-grey100 text-[130px] font-extralight leading-[130px] md:text-[170px] md:leading-[170px] lg:text-[200px] lg:leading-[200px]"
			>
				404
			</Typography>
			<Typography
				variant="span"
				className="font-medium text-black text-lg mt-[20px] mb-6 md:mt-[1px] md:text-[32px] md:font-bold md:leading-[40px] md:mb-[31px] lg:mt-2 lg:mb-6 "
			>
				Сторінка не знайдена
			</Typography>
			<Typography
				variant="span"
				className="text-grey100 text-base font-light text-center leading-6 mb-9 md:text-lg md:leading-[28px] md:mb-7 md:w-[390px] lg:w-full"
			>
				Ми не змогли знайти сторінку, яку Ви шукаєте. Можливо, сталася помилка
			</Typography>
			<NavigationLink to="/" variant="primary" size="large" style={{padding: "10px 20px", height: "48px", whiteSpace: 'nowrap' }}>
				Повернутись на головну
			</NavigationLink>
		</Container>
	);
};
