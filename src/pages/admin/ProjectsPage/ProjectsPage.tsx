import Typography from "../../../components/Typography/Typography.tsx";
import SearchBar from "../../../components/SearchBar/SearchBar.tsx";
import NavigationLink from "../../../components/Links/NavigationLink.tsx";
import { useEffect, useState } from "react";
import ListElement from "../../../components/AdminPanel/ListElements/ListElement.tsx";
import { getAllCards, removeCard } from "../../../api/CardsApi.ts";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import React from "react";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import { useNavigate } from "react-router-dom";
import { ProjectType } from "./interfaces/ProjectType.ts";


const ProjectsPage = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState("")
	const [projects, setProjects] = useState<ProjectType[]>([])
	const [currentPage, setCurrentPage] = useState(1);
	const [isAllChecked, setAllChecked] = useState(false);
	const [checkedItems, setCheckedItems] = useState(new Array(projects.length).fill(false));
	const [totalPages, setTotalPages] = useState(0);

	const handleRemove = (cardId: number) => {
		removeCard(cardId)
			.then(data => setProjects(data.cards))

	};

	useEffect(() => {
		navigate(`/admin/projects?page=${currentPage}`, { replace: true });
		getAllCards(currentPage)
			.then((resp) => {
				setProjects(resp.cards);
				setCheckedItems(new Array(resp.cards.length).fill(false));
				setTotalPages(resp.totalPages);
			})
	}, [currentPage]);

	const handleSelectedPage = (selectedPage: number) => {
		setCurrentPage(selectedPage);
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
	}

	const filteredProjects = value ? projects.filter((project) => project.title.includes(value)) : projects;

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
							className={"md:w-[280px] lg:w-[400px]"}
						/>
						<NavigationLink to={"new-project"} variant={"primaryDarkBg"} size={"large"}>Додати</NavigationLink>
					</div>
				</div>
			</div>
			<div className={"pt-6 pl-6 pr-[80px] pb-[128px] bg-grey30 min-h-[100vh]"}>
				<div>
					<div className={"flex mt-6 border-b border-black items-center justify-between "}>
						<div className={"flex gap-[18px] w-[439px] items-center"}>
							<div className={"w-[48px] h-[48px] p-3 check-wrapper "}>
								<label className="custom-checkbox">
									<input
										type="checkbox"
										className={"hidden"}
										checked={isAllChecked}
										onChange={handleAllCheckedChange}/>
									<span className="checkmark"></span>
								</label>
							</div>
							<div>Назва проєкту</div>
						</div>
						<div>Стан</div>
						<div className={'ml-[32px]'}>Дата</div>
							<div
								className={"w-[36px] h-[36px] ml-[78px] flex items-center justify-center cursor-pointer "}>
								<img src="/images/admin/bin.svg" alt="bin"/>
							</div>
					</div>
					{filteredProjects && filteredProjects.map((project, index) =>
					<React.Fragment key={project.cardId}>
						<ListElement
							id={project.cardId}
							name={capitalizeFirstLetter(project.title)}
							status={project.isEnabled ? 'активний' : 'неактивний'}
							date={project.publication}
							removeHandler={() => handleRemove(project.cardId)}
							checked={checkedItems[index]}
							onChange={handleCheckedChange(index)}
							editHandler={editHandler(project.cardId)}
						/>
					</React.Fragment>
					)}
				</div>
				<div>
					<Pagination pageCount={totalPages} currentPage={1} onSelectedPage={handleSelectedPage} prevClassName={'md:pl-[141px]'}/>
				</div>
			</div>
		</>
	);
};

export default ProjectsPage;