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
import React from "react";
import Search404 from "../components/Search404/Search404.tsx";

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
};

interface ImagesArrayType {
	imageId: number;
	image: string;
}

const SearchResults = () => {
	const { isMobile, isTablet } = useMedia();

	const [searchParams] = useSearchParams();
	const q = searchParams.get("q");
	const city = searchParams.get("city");
	const country = searchParams.get("country");
	const category = searchParams.get("category");
	const size = isMobile ? 6 : 4;
	const [results, setResults] = useState<ResultsType | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [images, setImages] = useState<ImagesArrayType[]>([]);
	const [additionalCards, setAdditionalCards] = useState<Card[]>([]);

	useEffect(() => {
		const params = {
			q,
			city,
			country,
			category: category === "Всі" ? null : category,
			page: currentPage,
			size,
		};

		searchRequest(params).then((data) => {
			setResults(data);
			const imagesArray: ImagesArrayType[] = [];
			data.cards.forEach((card: Card) => {
				getCardImage(card.imageId.toString()).then((resp) => {
					imagesArray.push({
						imageId: card.imageId,
						image: resp,
					});
				});
			});
			setImages(imagesArray);
		});
	}, [q, city, country, category, currentPage]);

	const loadMore = async () => {
		const nextPage = currentPage + 1;
		const params = {
			q,
			city,
			country,
			category: category === "Всі" ? null : category,
			page: nextPage,
			size,
		};
		const newItems = await searchRequest(params);
		setAdditionalCards([...additionalCards, ...newItems.cards]);
	};

	const handleSelectedPage = (selectedPage: number) => {
		setCurrentPage(selectedPage);
	};

	const findImageSrc = (imageId: number) => {
		const imageObj = images.find((image) => image.imageId === imageId);
		return imageObj ? imageObj.image : "";
	};
	const cardsToRender = isMobile
		? [...(results?.cards || []), ...additionalCards]
		: results?.cards;

	return (
		<>
			<section
				className={
					"w-full bg-yellow100 pt-6 pb-[80px] md:py-[56px]  lg:pt-11 lg:pb-[56px]"
				}
			>
				<Container>
					<Typography
						variant={"h1"}
						component={"h1"}
						className={
							"mb-12 md:max-w-[768px] mx-auto md:text-left lg:max-w-[1440px]"
						}
					>
						Проєкти
					</Typography>
					<HeroSearchBar />
				</Container>
			</section>
			<section
				className={"py-section-sm bg-[#ECECEC]"}
			>
				<Container>
					{cardsToRender?.length ? (
						<>
							<Typography
								variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}
								component={"h2"}
								className="text-center md:text-left md:ml-6 lg:ml-[80px] "
							>
								Знайдено результатів: {results?.totalSize}
							</Typography>
							<div className="mt-[32px] lg:mt-6">
								{cardsToRender &&
									cardsToRender.map((card, index) => (
										<React.Fragment key={index}>
											{isMobile ? (
												<ProjectCard
													imageSrc={findImageSrc(card.imageId)}
													title={card.title}
													text={card.description}
													variant={"carousel"}
												/>
											) : (
												<div className={"md:mx-6 lg:mx-[80px]"}>
													<ProjectCard
														imageSrc={findImageSrc(card.imageId)}
														title={card.title}
														text={card.description}
														variant={"search"}
													/>
												</div>
											)}
										</React.Fragment>
									))}
							</div>
							{isMobile ? (
								<div className={"flex justify-center"}>
									<Button
										variant={"secondary"}
										size={"wideMob"}
										className={"mt-[32px]"}
										onClick={loadMore}
									>
										Показати ще
									</Button>
								</div>
							) : (
								<Pagination
									pageCount={results?.totalPages || 0}
									currentPage={currentPage}
									onSelectedPage={handleSelectedPage}
								/>
							)}
						</>
					) : (
						<Search404 />
					)}
				</Container>
			</section>
		</>
	);
};

export default SearchResults;
