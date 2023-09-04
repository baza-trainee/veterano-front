import Container from "../Container/Container";
import HeroSearchBar from "../SearchForm/SearchForm";
import Typography from "../Typography/Typography";

const Hero = () => {
	return (
		<section className="bg-yellow100">
			<Container
				className={
					"bg-no-repeat pt-[24px] pb-[80px] px-[16px]" +
					" " +
					"lg:pt-[92px] lg:pb-[80px] lg:bg-[url('/hero/hero-lg.jpeg')] lg:bg-[bottom_10px_right_80px] " +
					" " +
					"md:px-[24px] md:py-[60px]  md:bg-[url('/hero/hero-md.jpg')] md:bg-[top_20px_right_28px]"
				}
			>
				<div
					className={
						"flex flex-col gap-[48px] lg:gap-[60px] md:w-[400px] lg:w-[630px]"
					}
				>
					<div className="flex flex-col gap-[24px] lg:gap-[44px] md:gap-[36px]">
						<Typography variant="h1">Захистив. Захистимо.</Typography>
						<Typography
							className="w-[288px] md:w-[250px] lg:block lg:w-[450px]"
							variant="p"
						>
							Ми підтримуємо кожного з наших героїв - ветеранів війни з Росією і
							запрошуємо знайти необхідну підтримку.
						</Typography>
					</div>
					<HeroSearchBar />
				</div>
			</Container>
		</section>
	);
};

export default Hero;
