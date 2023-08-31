import React, { useState } from "react";
import { Pagination, Typography } from "@mui/material";
import SearchBar from "../../SearchBar/SearchBar.tsx";
import NavigationLink from "../../Links/NavigationLink.tsx";
import { useNavigate } from "react-router-dom";
import ListElement from "../ListElements/ListElement.tsx";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";



const DataListPage = ({data, searchData}) => {
	const navigate = useNavigate();
	const [value, setValue] = useState("");
	const [isAllChecked, setAllChecked] = useState(false);
	const [checkedItems, setCheckedItems] = useState(new Array(data.length).fill(false));

	const handleAllCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		setAllChecked(isChecked);
		setCheckedItems(new Array(data.length).fill(isChecked));
	};

	const handleCheckedChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckedItems = [...checkedItems];
		newCheckedItems[index] = event.target.checked;
		setCheckedItems(newCheckedItems);
	};


	const filteredProjects = value ? searchData.filter((project) => project.title.includes(value)) : data;

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
						<NavigationLink to={"new-project"} variant={"primaryDarkBg"} size={"large"}>Додати</NavigationLink>
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
							onClick={handleRemoveSelected}>
							<img src="/images/admin/bin.svg" alt="bin" />
						</div>
					</div>
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

export default DataListPage;