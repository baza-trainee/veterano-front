import Section from "../Section/Section.tsx";
import Carousel from "../Carousel/Carousel.tsx";
import PartnersCard from "../PartnersCard/PartnersCard.tsx";
import { useMedia } from "../../hooks/useMedia.tsx";


const PartnersSection = () => {
	const { isDesktop, isTablet, isMobile } = useMedia();
	const items = [
		"https://images.unsplash.com/photo-1529787730-bdcabd22a644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		"https://images.unsplash.com/photo-1423492759094-e98da7756991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		"https://images.unsplash.com/photo-1560393390-eb46ee256b50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		"https://images.unsplash.com/photo-1454535524385-496c92f1f4b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZldGVyYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
		"https://images.unsplash.com/photo-1529787730-bdcabd22a644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		"https://images.unsplash.com/photo-1423492759094-e98da7756991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		"https://images.unsplash.com/photo-1423492759094-e98da7756991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
	]
	const itemsObjects = items.map(image => ({ image }));
	return (
		<Section title={"Партнери"} className={"bg-white px-[44px] md:pl-[38px] md:pr-[10px] lg:px-[80px]"}>
			{isDesktop && <Carousel
				items={itemsObjects}
				gap={52}
				slidesPerView={5}
				component={PartnersCard}
			/>}

			{isTablet && <Carousel
				items={itemsObjects}
				gap={21}
				slidesPerView={4}
				component={PartnersCard}
			/>}

			{isMobile && <Carousel
				items={itemsObjects}
				gap={1}
				slidesPerView={1}
				component={PartnersCard}
			/>}
		</Section>
	);
};

export default PartnersSection;