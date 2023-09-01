import Section from "../Section/Section.tsx";
import Carousel from "../Carousel/Carousel.tsx";
import ProjectCard from "../ProjectCard/ProjectCard.tsx";
import NavigationLink from "../Links/NavigationLink.tsx";
import { useMedia } from "../../hooks/useMedia.tsx";
import { searchRequest } from "../../api/SearchAPI.tsx";
import { useEffect, useState } from "react";
import { convertBackDataToProjectCardProps } from "../../../utils/backDataToProjectCardProps.ts";

const ProjectSection = () => {
	const { isDesktop, isTablet, isMobile } = useMedia();
	const [items, setItems] =
		useState<{ imageSrc: string; title: string; text: string }[]>();

	useEffect(() => {
		const params = {
			page: 1,
			size: 6,
		};

		searchRequest(params).then((data) => {
			setItems(convertBackDataToProjectCardProps(data.cards));
		});
	}, []);

	return (
		<Section
			title={"Проєкти"}
			className={"bg-grey30 md:pl-[38px] md:pr-[10px] lg:px-[80px]"}
		>
			{isDesktop && items?.length && (
				<Carousel
					items={items || []}
					gap={20}
					slidesPerView={3}
					component={ProjectCard}
					button={() => (
						<NavigationLink to={"/search"} variant={"secondary"}>
							Дивитись всі проекти
						</NavigationLink>
					)}
				/>
			)}

			{isTablet && (
				<Carousel
					items={items || []}
					gap={20}
					slidesPerView={2}
					component={ProjectCard}
					button={() => (
						<NavigationLink to={"/search"} variant={"secondary"}>
							Дивитись всі проекти
						</NavigationLink>
					)}
				/>
			)}

			{isMobile && (
				<div className={"project-section"}>
					{items?.slice(0, 3).map((item, index) => (
						<div key={index}>
							<ProjectCard
								imageSrc={item.imageSrc}
								title={item.title}
								text={item.text}
								variant={"carousel"}
							/>
						</div>
					))}
					<NavigationLink to={"/search"} variant={"secondary"}>
						Дивитись всі проекти
					</NavigationLink>
				</div>
			)}
		</Section>
	);
};

export default ProjectSection;
