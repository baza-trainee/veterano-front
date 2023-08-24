import ProjectSection from "../components/ProjectSection/ProjectSection.tsx";
import PartnersSection from "../components/PartnersSection/PartnersSection.tsx";
import SubscribeSection from "../components/SubscribeSection/SubscribeSection.tsx";
import ImageInput from "../components/ImageCroper/ImageInput.tsx";

const HomePage = () => {
	return (
		<>
			<ProjectSection />
			<PartnersSection />
			<SubscribeSection />
			<ImageInput width={265} height={232} />
		</>
	);
};

export default HomePage;
