import ProjectSection from "../components/ProjectSection/ProjectSection.tsx";
import PartnersSection from "../components/PartnersSection/PartnersSection.tsx";
import HeroSearchBar from "../components/SearchForm/SearchForm.tsx";

const HomePage = () => {
	return (
		<>
			<HeroSearchBar onSubmit={() => console.log("dsa")} />
			<ProjectSection />
			<PartnersSection />
		</>
	);
};

export default HomePage;
