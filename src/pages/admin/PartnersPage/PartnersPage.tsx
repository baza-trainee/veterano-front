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
import ModalWindow from "../../../components/Modal/ModalWindow.tsx";


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
	}, [currentPage]);

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
								<ModalWindow
									className={"bg-white w-[352px] h-[196px] px-6 py-[32px] flex flex-col gap-6 items-center "}
									style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
									active={active}
									setActive={setActive}
									isImage={false}>
									<div className={"text-[18px] font-medium leading-7"}>
										Підтвердити видалення
									</div>
									<div className={"text-[16px] font-light leading-6"}>
										Ви точно хочете видалити дані?
									</div>
									<div className={"flex gap-6 justify-center items-center text-[16px] font-light leading-6"}>
										<div className={"text-success100 flex items-center gap-2 cursor-pointer"}
												 onClick={() => {
													 console.log(partner.id);
													 handleRemove(partner.id, setPartners, "id", removePartner)
													 setActive(false)
												 }}>
											<img src="/admin/approve.svg" alt={"approve"} />
											Так
										</div>
										<div className={"text-error50 flex items-center gap-2 cursor-pointer"}>
											<img src="/admin/cancel.svg" alt={"cancel"} />
											Скасувати
										</div>
									</div>
								</ModalWindow>}
						</React.Fragment>
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