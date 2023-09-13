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
import {
	handleAllCheckedChange,
	handleRemove,
	handleRemoveSelected,
} from "../../../../utils/functions/admin/adminFnc.ts";
import Search404 from "../../../components/Search404/Search404.tsx";
import ConfirmModal from "../../../components/AdminPanel/ConfirmModal/ConfirmModal.tsx";

const ProjectsPage = () => {
	const navigate = useNavigate();
	const urlParams = new URLSearchParams(window.location.search);
	const pageParam = urlParams.get("page");
	const page = pageParam ? parseInt(pageParam) : 1;
	const [value, setValue] = useState("");
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [searchData, setSearchData] = useState<ProjectType[]>([]);
	const [currentPage, setCurrentPage] = useState(page);
	const [isAllChecked, setAllChecked] = useState(false);
	const [checkedItems, setCheckedItems] = useState(new Array(projects.length).fill(false));
	const [totalPages, setTotalPages] = useState(0);
	const [active, setActive] = useState(false);
	const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

	const openModal = (projectId: number) => {
		setSelectedProjectId(projectId);
		setActive(true);
	};

	useEffect(() => {
		getAllCards(currentPage, 7)
			.then((resp) => {
				setProjects(resp.cards);
				setCheckedItems(new Array(resp.cards.length).fill(false));
				setTotalPages(resp.totalPages);
			});
	}, [currentPage, page]);

	useEffect(() => {
		getAllCards(1, 100)
			.then((resp) => {
				setSearchData(resp.cards);
			});
	}, []);

	const handleCheckedChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckedItems = [...checkedItems];
		newCheckedItems[index] = event.target.checked;
		setCheckedItems(newCheckedItems);
	};

	const filteredProjects = value ? searchData.filter((project) => project.title.toLowerCase().includes(value.toLowerCase())) : projects;

	return (
		<>
			<HeaderComponent
				name={"Проєкти"}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>

			<div className={"pt-6 pl-6 pr-[80px] pb-[128px] bg-grey30 min-h-[100vh]"}>
				<div className={"min-h-[609px]"}>
					<TableHeader
						checked={isAllChecked}
						name={"Назва проєкту"}
						onChange={handleAllCheckedChange(setAllChecked, setCheckedItems, projects.length)}
						onClick={() => handleRemoveSelected(projects, checkedItems, setProjects, setCheckedItems, removeCheckedCards, "cardId")} />
					{filteredProjects.length < 1 && <Search404/>}
					{filteredProjects && filteredProjects.map((project, index) =>
						<React.Fragment key={project.cardId}>
							<ListElement
								id={project.cardId}
								name={capitalizeFirstLetter(project.title)}
								status={project.isEnabled ? "активний" : "неактивний"}
								date={project.publication}
								removeHandler={() => openModal(project.cardId)}
								checked={checkedItems[index]}
								onChange={handleCheckedChange(index)}
								editHandler={() => navigate(`/admin/projects/edit-project/${project.cardId}`)}
							/>
							{active && selectedProjectId === project.cardId &&
								<ConfirmModal
									onClick={() => {
										handleRemove(project.cardId, setProjects, "cardId", removeCard)
										setActive(false)
									}}
									active={active}
									setActive={setActive}
								/>
							}
						</React.Fragment>,
					)}
				</div>
				<div className={"mt-[25px]"}>
					<Pagination
						pageCount={totalPages}
						currentPage={currentPage}
						onSelectedPage={(selectedPage: number) => {setCurrentPage(selectedPage)}}
						prevClassName={"md:!pl-[141px]"} />
				</div>
			</div>
		</>
	);
};

export default ProjectsPage;