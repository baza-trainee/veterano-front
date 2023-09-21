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
import Search404 from "../../../components/Search404/Search404.tsx";
import ConfirmModal from "../../../components/AdminPanel/ConfirmModal/ConfirmModal.tsx";


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
	const urlParams = new URLSearchParams(window.location.search);
	const pageParam = urlParams.get("page");
	const page = pageParam ? parseInt(pageParam) : 1;
	const [value, setValue] = useState("");
	const [partners, setPartners] = useState<PartnersType[]>([]);
	const [searchData, setSearchData] = useState<PartnersType[]>([]);
	const [currentPage, setCurrentPage] = useState(page);
	const [isAllChecked, setAllChecked] = useState(false);
	const [checkedItems, setCheckedItems] = useState(new Array(partners.length).fill(false));
	const [totalPages, setTotalPages] = useState(0);
	const [active, setActive] = useState(false);
	const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(null);

	const openModal = (partnerId: number) => {
		setSelectedPartnerId(partnerId);
		setActive(true);
	};
	useEffect(() => {
		getAllPartners(currentPage, 7)
			.then((resp) => {
				setPartners(resp.partnerDTOList);
				setCheckedItems(new Array(resp.partnerDTOList.length).fill(false));
				setTotalPages(resp.totalPages);
			});
	}, [currentPage, page]);

	useEffect(() => {
		getAllPartners(1, 100)
			.then((resp) => {
				setSearchData(resp.partnerDTOList);
			});
	}, []);

	const handleCheckedChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckedItems = [...checkedItems];
		newCheckedItems[index] = event.target.checked;
		setCheckedItems(newCheckedItems);
	};

	const filteredProjects = value ? searchData.filter((project) => project.partnerName.toLowerCase().includes(value.toLowerCase())) : partners;

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
						name={"Назва"}
						onChange={handleAllCheckedChange(setAllChecked, setCheckedItems, partners.length)}
						onClick={() => handleRemoveSelected(partners, checkedItems, setPartners, setCheckedItems, removeCheckedPartners, "id")}
					/>
					{filteredProjects.length < 1 && <Search404 />}
					{filteredProjects && filteredProjects.map((partner, index) =>
						<React.Fragment key={partner.id}>
							<ListElement
								id={partner.id}
								name={capitalizeFirstLetter(partner.partnerName)}
								status={partner.isEnabled ? "активний" : "неактивний"}
								date={partner.publication}
								removeHandler={() => openModal(partner.id)}
								checked={checkedItems[index]}
								onChange={handleCheckedChange(index)}
								editHandler={() => navigate(`/admin/partners/${partner.id}`)}
							/>
							{active && selectedPartnerId === partner.id &&
								<ConfirmModal
									onClick={() => {
										handleRemove(partner.id, setPartners, "id", removePartner);
										setActive(false);
									}}
									active={active}
									setActive={setActive}
								/>
							}
						</React.Fragment>,
					)}
				</div>
				{partners.length > 0 &&
					<div className={"mt-[25px]"}>
						<Pagination pageCount={totalPages} currentPage={currentPage} onSelectedPage={(selectedPage: number) => {
							setCurrentPage(selectedPage);
						}}
												prevClassName={"md:!pl-[141px]"} />
					</div>}

			</div>


		</>
	);
};

export default PartnersPage;