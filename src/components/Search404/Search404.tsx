import Container from "../Container/Container.tsx";
import { useMedia } from "../../hooks/useMedia.tsx";


const Search404 = () => {
	const {isMobile, } = useMedia()
	return (
		<Container className={"flex flex-col justify-center items-center py-[80px] px-4 lg:pt-[110px] lg:pb-[120px]"}>
			<div className={"md:w-[110px] md:h-[110px]"}>
				<img src={ isMobile ? "/images/no-results-320.svg" : "/images/no-results-768.svg"}
					alt="no results" />
			</div>
			<div className={'text-[18px] font-medium leading-7 text-center mt-[40px] md:text-[28px] md:leading-[30px] lg:leading-[40px] lg:font-bold'}>
				<p>За вашим запитом нічого не знайдено</p>
			</div>
		</Container>
	);
};

export default Search404;