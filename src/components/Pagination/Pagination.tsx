import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ArrowButton from "../ArrowButton/ArrowButton.tsx";
import ReactPaginate from "react-paginate";

interface PaginationProps {
	pageCount: number
	currentPage: number,
	onSelectedPage: (selectedPage: number) => void;
	className?: string
	prevClassName?: string
}

type PageClickData = {
	selected: number;
};

const Pagination: FC<PaginationProps> = ({ pageCount = 2, currentPage = 1, onSelectedPage, className, prevClassName }) => {
	const navigate = useNavigate();

	const handlePageClick = (data: PageClickData) => {
		const selectedPage = data.selected + 1;
		navigate(`?page=${selectedPage}`);
		onSelectedPage(selectedPage);
	};

	return (
		<div className={className + " " + "flex justify-end "}>
			<ReactPaginate
				previousLabel={<ArrowButton direction={"left"} variant={'carousel'} disabled={currentPage === 1}/>}
				nextLabel={<ArrowButton direction={"right"} variant={'carousel'} disabled={currentPage === pageCount}/>}
				breakLabel={'...'}
				breakClassName={'w-[32px] h-[32px] px-[10px] mr-[34px] flex items-center'}
				pageCount={pageCount}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				onPageChange={handlePageClick}
				pageClassName={'w-[32px] h-[32px] px-[10px] rounded inline-flex items-center justify-center mr-[34px] hover:bg-yellow100 hover:text-white'}
				containerClassName={'flex justify-between items-center text-[18px] font-light leading-[28px] mt-[50px] lg:mt-[59px] '}
				activeClassName={'bg-black text-white'}
				previousClassName={ prevClassName + " " + 'previous order-2 mr-2 md:pl-[155px] lg:pl-[419px]'}
				nextClassName={'order-3'}
				forcePage={currentPage - 1}
			/>
		</div>

	);
};

export default Pagination;