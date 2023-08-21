import Section from "../components/Section/Section.tsx";
import Typography from "../components/Typography/Typography.tsx";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeroSearchBar from "../components/SearchForm/SearchForm.tsx";



const SearchResults = () => {

	const [searchParams] = useSearchParams();
	const q = searchParams.get('q');
	const location = searchParams.get('location');
	const category = searchParams.get('category');

	const [result, setResults] = useState([])

	console.log(q , location, category );
	useEffect(() => {
		//тут фетчим дані з сервера?
	})

	return (
		<div>
			<section className={'w-full bg-yellow100 px-4 pt-6 pb-[80px] md:py-[56px] md:px-6 lg:pt-11 lg:pb-[56px] lg:pl-[80px]'} >
				<Typography variant={'h1'} component={'h1'} className={'mb-12 md:text-left'}>Проєкти</Typography>
				<HeroSearchBar/>
			</section>
			<Section title={'Знайдено результатів: 33'}>

			</Section>
		</div>
	);
};

export default SearchResults;