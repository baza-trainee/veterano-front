import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { convertBackDataToProjectCardProps } from "../../utils/backDataToProjectCardProps.ts";
import { searchRequest } from "../api/SearchAPI.tsx";
import Button from "../components/Button/Button.tsx";
import Container from "../components/Container/Container.tsx";
import Pagination from "../components/Pagination/Pagination.tsx";
import ProjectCard from "../components/ProjectCard/ProjectCard.tsx";
import Search404 from "../components/Search404/Search404.tsx";
import HeroSearchBar from "../components/SearchForm/SearchForm.tsx";
import Typography from "../components/Typography/Typography.tsx";
import { useMedia } from "../hooks/useMedia.tsx";

interface Card {
	description: string;
	title: string;
	url: string;
	imageSrc: string;
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
			console.log(data);
			convertBackDataToProjectCardProps(data.cards);
			setResults({
				...data,
				cards: convertBackDataToProjectCardProps(data.cards),
			});
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
				className={"py-section-sm md:py-[80px] lg:py-[100px] bg-[#ECECEC]"}
			>
				<Container>
					{cardsToRender?.length ? (
						<>
							<Typography
								variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}
								component={"h2"}
								className="text-center md:text-left"
							>
								Знайдено результатів: {results?.totalSize}
							</Typography>
							<div className="mt-[32px] lg:mt-6">
								{cardsToRender &&
									cardsToRender.map((card, index) => (
										<ProjectCard
											key={index}
											imageSrc={card.imageSrc}
											url={card.url}
											title={card.title}
											text={card.description}
											variant={isMobile ? "carousel" : "search"}
										/>
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
