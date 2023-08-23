import ProjectSection from "../components/ProjectSection/ProjectSection.tsx";
import PartnersSection from "../components/PartnersSection/PartnersSection.tsx";
import SubscribeSection from "../components/SubscribeSection/SubscribeSection.tsx";
import Hero from "../components/Hero/Hero.tsx";

const HomePage = () => {
	return (
		<>
			<Hero />
			<ProjectSection />
			<PartnersSection />
			<SubscribeSection />
		</>
	);
};

export default HomePage;
