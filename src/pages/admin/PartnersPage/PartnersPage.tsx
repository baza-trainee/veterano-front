import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPartners, removeCheckedPartners, removePartner } from "../../../api/PartnersAPI.ts";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import ListElement from "../../../components/AdminPanel/ListElements/ListElement.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import React from "react";
import HeaderComponent from "../../../components/AdminPanel/HeaderComponent.tsx";
import TableHeader from "../../../components/AdminPanel/ListElements/TableHeader.tsx";


interface PartnersType {
	id: number,
	partnerName: string,
	image: string,
	url: string,
	publication: string,
	isEnabled: boolean
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

	const handleRemove = (id: number) => {
		removePartner(id)
			.then(() => setPartners(prevProjects => prevProjects.filter(project => project.id !== id)));
	};

	useEffect(() => {
		navigate(`/admin/partners?page=${currentPage}`, { replace: true });
		getAllPartners()
			.then((resp) => {
				setPartners(resp);
				setCheckedItems(new Array(resp.length).fill(false));
				// setTotalPages(1);
			});
	}, [currentPage]);

	// useEffect(() => {
	// 	getAllPartners(currentPage, 100)
	// 		.then((resp) => {
	// 			setSearchData(resp.cards);
	// 		});
	// }, []);

	const handleSelectedPage = (selectedPage: number) => {
		setCurrentPage(selectedPage);
	};

	const handleRemoveSelected = () => {
		const selectedIds = partners.filter((_, index) => checkedItems[index]).map(p => p.id);

		removeCheckedPartners(selectedIds)
			.then(() => {
				setPartners(prev => prev.filter(p => !selectedIds.includes(p.id)));
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
			<HeaderComponent
				name={"Партнери"}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<div className={"pt-6 pl-6 pr-[80px] pb-[128px] bg-grey30 min-h-[100vh]"}>
				<div className={"min-h-[609px]"}>
					<TableHeader
						checked={isAllChecked}
						name={'Назва проєкту'}
						onChange={handleAllCheckedChange}
						onClick={handleRemoveSelected}/>
					{filteredProjects && filteredProjects.map((project, index) =>
						<React.Fragment key={project.id}>
							<ListElement
								id={project.id}
								name={capitalizeFirstLetter(project.partnerName)}
								status={project.isEnabled ? "активний" : "неактивний"}
								date={project.publication}
								removeHandler={() => handleRemove(project.id)}
								checked={checkedItems[index]}
								onChange={handleCheckedChange(index)}
								editHandler={editHandler(project.id)}
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

export default PartnersPage;