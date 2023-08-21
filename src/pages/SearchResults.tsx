import Section from "../components/Section/Section.tsx";
import Typography from "../components/Typography/Typography.tsx";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeroSearchBar from "../components/SearchForm/SearchForm.tsx";
import { getCardImage, searchRequest } from "../api/SearchAPI.tsx";
import ProjectCard from "../components/ProjectCard/ProjectCard.tsx";
import Pagination from "../components/Pagination/Pagination.tsx";
import { useMedia } from "../hooks/useMedia.tsx";
import Button from "../components/Button/Button.tsx";
import Container from "../components/Container/Container.tsx";

interface Card {
	description: string;
	title: string;
	url: string;
	imageId: number;
	publication: string;
	category: string;
	location: {
		country: string;
		city: string;
	};
}

type ResultsType = {
	cards: Card[];
	totalPages: number;
	totalSize: number;
}

interface ImagesArrayType {
	imageId: number;
	image: string;
}

const SearchResults = () => {
	const { isMobile } = useMedia();

	const [searchParams] = useSearchParams();
	const q = searchParams.get("q");
	const city = searchParams.get("city");
	const country = searchParams.get("country");
	const category = searchParams.get("category");
	const [results, setResults] = useState<ResultsType | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [images, setImages] = useState<ImagesArrayType[]>([]);

	useEffect(() => {
		searchRequest({ q, city, country, category, page: currentPage })
			.then(data => {
				setResults(data);
				const imagesArray: ImagesArrayType[] = [];
				data.cards.forEach((card: Card) => {
					getCardImage(card.imageId.toString())
						.then(resp => {
							imagesArray.push({
								imageId: card.imageId,
								image: resp,
							});
						});
				});
				setImages(imagesArray);
			});
	}, [q, city, country, category, currentPage]);
	const handleSelectedPage = (selectedPage: number) => {
		setCurrentPage(selectedPage);
	};

	const findImageSrc = (imageId: number) => {
		const imageObj = images.find(image => image.imageId === imageId);
		return imageObj ? imageObj.image : "";
	};

	return (
		<>
			<section
				className={"w-full bg-yellow100 px-4 pt-6 pb-[80px] md:py-[56px] md:px-6 lg:pt-11 lg:pb-[56px] lg:pl-[80px]"}>
				<Typography
					variant={"h1"}
					component={"h1"}
					className={"mb-12 md:max-w-[768px] mx-auto md:text-left lg:max-w-[1440px]"}>Проєкти</Typography>
				<HeroSearchBar />
			</section>
			<section className={"py-section-sm md:py-[80px] lg:py-[100px] bg-[#ECECEC]"} >
				<Container>
					<Typography variant={isMobile ? "h5" : 'h4'} component={'h2'} className="text-center md:text-left md:ml-6 lg:ml-[80px]">
						Знайдено результатів: {results?.totalSize}
					</Typography>
					<div className="mt-[32px] lg:mt-6">
						{results?.cards && results?.cards.map((card, index) =>
							isMobile?
								<ProjectCard
									key={index}
									imageSrc={findImageSrc(card.imageId)}
									title={card.title}
									text={card.description}
									variant={"carousel"} />
								:
								<div className={'md:mx-6 lg:mx-[80px]'}>
									<ProjectCard
										key={index}
										imageSrc={'https://images.unsplash.com/photo-1529787730-bdcabd22a644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmV0ZXJhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'}
										title={card.title}
										text={card.description}
										variant={"search"} />
								</div>
						)}

					</div>
					{isMobile ?
						<div className={'flex justify-center'}><Button variant={'secondary'} size={'wideMob'} className={'mt-[32px]'}>Показати ще</Button></div>
						:
						<Pagination
						pageCount={results?.totalPages || 0}
						currentPage={currentPage}
						onSelectedPage={handleSelectedPage} />}
				</Container>
			</section>
		</>
	);
};

export default SearchResults;