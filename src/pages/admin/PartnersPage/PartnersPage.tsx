import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPartners, removeCheckedPartners, removePartner } from "../../../api/PartnersAPI.ts";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import ListElement from "../../../components/AdminPanel/ListElements/ListElement.tsx";
import NavigationLink from "../../../components/Links/NavigationLink.tsx";
import SearchBar from "../../../components/SearchBar/SearchBar.tsx";
import Typography from "../../../components/Typography/Typography.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";


interface PartnersType{
	partnerName: string,
	image: string,
	url: string,
	publication: string,
	isEnable: boolean
}


const PartnersPage = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState("");
	const [partners, setPartners] = useState<PartnersType[]>([]);
	const [searchData, setSearchData] = useState<PartnersType[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isAllChecked, setAllChecked] = useState(false);
	const [checkedItems, setCheckedItems] = useState(new Array(3).fill(false));
	const [totalPages, setTotalPages] = useState(0);

	const handleRemove = (cardId: number) => {
		removePartner(cardId)
			.then(() => setPartners(prevProjects => prevProjects.filter(project => project.cardId !== cardId)));
	};

	useEffect(() => {
		navigate(`/admin/partners?page=${currentPage}`, { replace: true });
		getAllPartners(currentPage, 7)
			.then((resp) => {
				setPartners(resp.cards);
				setCheckedItems(new Array(resp.cards.length).fill(false));
				setTotalPages(resp.totalPages);
			});
	}, [currentPage]);

	useEffect(() => {
		getAllPartners(currentPage, 100)
			.then((resp) => {
				setSearchData(resp.cards);
			});
	}, []);

	const handleSelectedPage = (selectedPage: number) => {
		setCurrentPage(selectedPage);
	};

	const handleRemoveSelected = () => {
		const selectedIds = partners.filter((_, index) => checkedItems[index]).map(p => p.cardId);

		removeCheckedPartners(selectedIds)
			.then(() => {
				setPartners(prev => prev.filter(p => !selectedIds.includes(p.cardId)));
			});
	};

	const handleAllCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		setAllChecked(isChecked);
		setCheckedItems(new Array(partners.length).fill(isChecked));
	};

	const handleCheckedChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckedItems = [...checkedItems];
		newCheckedItems[index] = event.target.checked;
		setCheckedItems(newCheckedItems);
	};

	const editHandler = (cardId: number) => () => {
		navigate(`/admin/projects/edit-project/${cardId}`);
	};

	const filteredProjects = value ? searchData.filter((project) => project.partnerName.includes(value)) : partners;

	return (
		<>
			<div className={"bg-grey100"}>
				<div className={"px-[36px] pt-[38px] pb-[38px] pr-[80px] h-[118px] flex justify-between"}>
					<Typography variant={"h3"} component={"h3"} className={"text-white"}>Проєкти</Typography>
					<div className={"flex gap-16"}>
						<SearchBar
							value={value}
							onChange={(e) => setValue(e.target.value)}
							placeholder={"Введіть ключове слово для пошуку"}
							disabled={false}
							className={"md:w-[280px] lg:w-[400px] text-[14px]"}
						/>
						<NavigationLink to={"add"} variant={"primaryDarkBg"} size={"large"}>Додати</NavigationLink>
					</div>
				</div>
			</div>
			<div className={"pt-6 pl-6 pr-[80px] pb-[128px] bg-grey30 min-h-[100vh]"}>
				<div className={'min-h-[609px]'}>
					<div className={"flex mt-6 border-b border-black items-center justify-between "}>
						<div className={"flex gap-[18px] w-[439px] items-center"}>
							<div className={"w-[48px] h-[48px] p-3 check-wrapper "}>
								<label className="custom-checkbox">
									<input
										type="checkbox"
										className={"hidden"}
										checked={isAllChecked}
										onChange={handleAllCheckedChange} />
									<span className="checkmark"></span>
								</label>
							</div>
							<div>Назва проєкту</div>
						</div>
						<div>Стан</div>
						<div className={"ml-[32px]"}>Дата</div>
						<div
							className={"w-[36px] h-[36px] ml-[78px] flex items-center justify-center cursor-pointer "}
							// onClick={handleRemoveSelected}
						>
							<img src="/images/admin/bin.svg" alt="bin" />
						</div>
					</div>
					{/*{filteredProjects && filteredProjects.map((project, index) =>*/}
					{/*	<React.Fragment key={project.cardId}>*/}
					{/*		<ListElement*/}
					{/*			id={project.cardId}*/}
					{/*			name={capitalizeFirstLetter(project.partnerName)}*/}
					{/*			status={project.isEnabled ? "активний" : "неактивний"}*/}
					{/*			date={project.publication}*/}
					{/*			removeHandler={() => handleRemove(project.cardId)}*/}
					{/*			checked={checkedItems[index]}*/}
					{/*			onChange={handleCheckedChange(index)}*/}
					{/*			editHandler={editHandler(project.cardId)}*/}
					{/*		/>*/}
					{/*	</React.Fragment>,*/}
					{/*)}*/}
				</div>
				<div className={"mt-[25px]"}>
					<Pagination pageCount={totalPages} currentPage={1} onSelectedPage={handleSelectedPage}
											prevClassName={"md:!pl-[141px]"} />
				</div>
			</div>
		</>
	);
};

export default PartnersPage;