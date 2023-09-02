import Section from "../Section/Section.tsx";
import Carousel from "../Carousel/Carousel.tsx";
import PartnersCard from "../PartnersCard/PartnersCard.tsx";
import { useMedia } from "../../hooks/useMedia.tsx";
import { useEffect, useState } from "react";
import { searchPartners } from "../../api/SearchAPI.tsx";

interface PartnerType {
	id: number,
	partnerName: string,
	image: string,
	url: string,
	publication: string,
	isEnabled: boolean

}
const PartnersSection = () => {
	const { isDesktop, isTablet, isMobile } = useMedia();
 const [images, setImages] = useState<string[]>()

	useEffect(() => {
		searchPartners()
			.then((data) => {
				const arrayImg = data.map((partner: PartnerType)  => `http://45.94.157.117:8080/api/v1/search/image/get?id=${partner.image}`);
				setImages(arrayImg);
			});

	}, []);

	const itemsObjects = images && images.map(image => ({ image }));

	return (
		<Section title={"Партнери"} className={"bg-white px-[44px] md:pl-[38px] md:pr-[10px] lg:px-[80px]"}>
			{isDesktop && <Carousel
				items={itemsObjects || []}
				gap={52}
				slidesPerView={5}
				component={PartnersCard}
			/>}

			{isTablet && <Carousel
				items={itemsObjects || []}
				gap={21}
				slidesPerView={4}
				component={PartnersCard}
			/>}

			{isMobile && <Carousel
				items={itemsObjects || []}
				gap={1}
				slidesPerView={1}
				component={PartnersCard}
			/>}
		</Section>
	);
};

export default PartnersSection;