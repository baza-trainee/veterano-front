import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPartners, removeCheckedPartners, removePartner } from "../../../api/PartnersAPI.ts";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import ListElement from "../../../components/AdminPanel/ListElements/ListElement.tsx";
import Pagination from "../../../components/Pagination/Pagination.tsx";
import React from "react";
import HeaderComponent from "../../../components/AdminPanel/HeaderComponent.tsx";
import TableHeader from "../../../components/AdminPanel/ListElements/TableHeader.tsx";
import {
	handleAllCheckedChange,
	handleRemove,
	handleRemoveSelected,
} from "../../../../utils/functions/admin/adminFnc.ts";


export interface PartnersType {
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
	const [checkedItems, setCheckedItems] = useState(new Array(partners.length).fill(false));
	const [totalPages, setTotalPages] = useState(0);

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

	const handleCheckedChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckedItems = [...checkedItems];
		newCheckedItems[index] = event.target.checked;
		setCheckedItems(newCheckedItems);
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
						name={'Назва'}
						onChange={handleAllCheckedChange(setAllChecked, setCheckedItems, partners.length)}
						onClick={() => handleRemoveSelected(partners, checkedItems, setPartners, setCheckedItems, removeCheckedPartners, 'id')}
						/>
						{filteredProjects && filteredProjects.map((partner, index) =>
						<React.Fragment key={partner.id}>
							<ListElement
								id={partner.id}
								name={capitalizeFirstLetter(partner.partnerName)}
								status={partner.isEnabled ? "активний" : "неактивний"}
								date={partner.publication}
								removeHandler={() => handleRemove(partner.id, setPartners, 'id', removePartner)}
								checked={checkedItems[index]}
								onChange={handleCheckedChange(index)}
								editHandler={() => navigate(`/admin/partners/${partner.id}`)}
							/>
						</React.Fragment>,
					)}
				</div>
				<div className={"mt-[25px]"}>
					<Pagination pageCount={totalPages} currentPage={currentPage} onSelectedPage={(selectedPage: number) => {
						setCurrentPage(selectedPage);
					}}
											prevClassName={"md:!pl-[141px]"} />
				</div>
			</div>
		</>
	);
};

export default PartnersPage;