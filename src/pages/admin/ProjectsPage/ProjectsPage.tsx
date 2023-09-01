import { useEffect, useState } from "react";
import ListElement from "../../../components/AdminPanel/ListElements/ListElement.tsx";
import { getAllCards, removeCard, removeCheckedCards } from "../../../api/CardsApi.ts";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import React from "react";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import { useNavigate } from "react-router-dom";
import { ProjectType } from "./interfaces/ProjectType.ts";
import HeaderComponent from "../../../components/AdminPanel/HeaderComponent.tsx";
import TableHeader from "../../../components/AdminPanel/ListElements/TableHeader.tsx";


const ProjectsPage = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState("");
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [searchData, setSearchData] = useState<ProjectType[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isAllChecked, setAllChecked] = useState(false);
	const [checkedItems, setCheckedItems] = useState(new Array(projects.length).fill(false));
	const [totalPages, setTotalPages] = useState(0);

	const handleRemove = (cardId: number) => {
		removeCard(cardId)
			.then(() => setProjects(prevProjects => prevProjects.filter(project => project.cardId !== cardId)));
	};

	useEffect(() => {
		navigate(`/admin/projects?page=${currentPage}`, { replace: true });
		getAllCards(currentPage, 7)
			.then((resp) => {
				setProjects(resp.cards);
				setCheckedItems(new Array(resp.cards.length).fill(false));
				setTotalPages(resp.totalPages);
			});
	}, [currentPage]);

	useEffect(() => {
		getAllCards(currentPage, 100)
			.then((resp) => {
				setSearchData(resp.cards);
			});
	}, []);

	const handleSelectedPage = (selectedPage: number) => {
		setCurrentPage(selectedPage);
	};

	const handleRemoveSelected = () => {
		const selectedIds = projects.filter((_, index) => checkedItems[index]).map(p => p.cardId);

		removeCheckedCards(selectedIds)
			.then(() => {
				setProjects(prev => prev.filter(p => !selectedIds.includes(p.cardId)));
			});
	};

	const handleAllCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		setAllChecked(isChecked);
		setCheckedItems(new Array(projects.length).fill(isChecked));
	};

	const handleCheckedChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckedItems = [...checkedItems];
		newCheckedItems[index] = event.target.checked;
		setCheckedItems(newCheckedItems);
	};

	const editHandler = (cardId: number) => () => {
		navigate(`/admin/projects/edit-project/${cardId}`);
	};

	const filteredProjects = value ? searchData.filter((project) => project.title.includes(value)) : projects;

	return (
		<>
			<HeaderComponent
				name={"Проєкти"}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>

			<div className={"pt-6 pl-6 pr-[80px] pb-[128px] bg-grey30 min-h-[100vh]"}>
				<div className={'min-h-[609px]'}>
					<TableHeader
						checked={isAllChecked}
						name={'Назва проєкту'}
						onChange={handleAllCheckedChange}
						onClick={handleRemoveSelected}/>
					{filteredProjects && filteredProjects.map((project, index) =>
						<React.Fragment key={project.cardId}>
							<ListElement
								id={project.cardId}
								name={capitalizeFirstLetter(project.title)}
								status={project.isEnabled ? "активний" : "неактивний"}
								date={project.publication}
								removeHandler={() => handleRemove(project.cardId)}
								checked={checkedItems[index]}
								onChange={handleCheckedChange(index)}
								editHandler={editHandler(project.cardId)}
							/>
						</React.Fragment>,
					)}
				</div>
				<div className={"mt-[25px]"}>
					<Pagination pageCount={totalPages} currentPage={1} onSelectedPage={handleSelectedPage}
											prevClassName={"md:!pl-[141px]"} />
				</div>
			</div>
		</>
	);
};

export default ProjectsPage;