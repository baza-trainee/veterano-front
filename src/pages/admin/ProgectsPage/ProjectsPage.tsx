import Typography from "../../../components/Typography/Typography.tsx";
import SearchBar from "../../../components/SearchBar/SearchBar.tsx";
import NavigationLink from "../../../components/Links/NavigationLink.tsx";
import { useEffect, useState } from "react";
import ListElement from "../../../components/AdminPanel/ListElements/ListElement.tsx";
import { getAllCards } from "../../../api/CardsApi.ts";
import Pagination from "../../../components/Pagination/Pagination.tsx";

const ProjectsPage = () => {
	const [value, setValue] = useState("")
	const [projects, setProjects] = useState([])
	const [currentPage, setCurrentPage] = useState(1);


	useEffect(() => {
		getAllCards()
			.then((resp) => setProjects(resp))

	}, []);

	const handleSelectedPage = (selectedPage: number) => {
		setCurrentPage(selectedPage);
	};

	console.log(projects);
	return (
		<>
			<div className={"bg-grey100"}>
				<div className={"px-[36px] pt-[38px] pb-[38px] h-[118px] flex justify-between"}>
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
			<div className={"pt-6 pl-6 pr-[80px] pb-[128px] bg-grey30"}>
				<div>
					<div className={"flex mt-6 border-b border-black items-center justify-between "}>
						<div className={"flex gap-[18px] w-[439px] items-center"}>
							<div className={"w-[48px] h-[48px] p-3 check-wrapper "}>
								<label className="custom-checkbox">
									<input type="checkbox" className={"hidden"} />
									<span className="checkmark"></span>
								</label>
							</div>
							<div>Назва проєкту</div>
						</div>
						<div>Стан</div>
						<div>Дата</div>
							<div
								className={"w-[36px] h-[36px] ml-[78px] mr-[5px] flex items-center justify-center "}>
								<img src="/images/admin/bin.svg" alt="bin"/>
							</div>
					</div>
					<ListElement name={"name name name"} status={"active"} date={"28.93.3993"} />
					<ListElement name={"name name name"} status={"active"} date={"28.93.3993"} />
					<ListElement name={"name name name"} status={"active"} date={"28.93.3993"} />
				</div>
				<div>
					<Pagination pageCount={6} currentPage={1} onSelectedPage={handleSelectedPage} prevClassName={'md:pl-[141px]'}/>
				</div>
			</div>
		</>
	);
};

export default ProjectsPage;