import Section from "../Section/Section.tsx";
import Carousel from "../Carousel/Carousel.tsx";
import ProjectCard from "../ProjectCard/ProjectCard.tsx";
import NavigationLink from "../Links/NavigationLink.tsx";
import { useMedia } from "../../hooks/useMedia.tsx";

const ProjectSection = () => {
	const items = [
		{
			title: "Проект 1",
			text: "Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. ороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.",
			imageSrc:
				"https://images.unsplash.com/photo-1529787730-bdcabd22a644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		},
		{
			title: "Проект 2",
			text: "Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. ороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.",
			imageSrc:
				"https://images.unsplash.com/photo-1529787730-bdcabd22a644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		},
		{
			title: "Проект 3",
			text: "Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. ороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.",
			imageSrc:
				"https://images.unsplash.com/photo-1529787730-bdcabd22a644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		},
		{
			title: "Проект 4",
			text: "Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. ороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.",
			imageSrc:
				"https://images.unsplash.com/photo-1529787730-bdcabd22a644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		},
		{
			title: "Проект 5",
			text: "Короткий опис. Інформаційний блок з описом трьох зовнішніх проєктів. ороткий опис. Інформаційний блок з описом трьох зовнішніх проєктів.",
			imageSrc:
				"https://images.unsplash.com/photo-1529787730-bdcabd22a644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
		},
	];
	const { isDesktop, isTablet, isMobile } = useMedia();

	return (
		<Section
			title={"Проєкти"}
			className={"bg-grey30 md:pl-[38px] md:pr-[10px] lg:px-[80px]"}
		>
			{isDesktop && (
				<Carousel
					items={items}
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
					items={items}
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
