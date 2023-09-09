import { useEffect, useState } from "react";

import Typography from "../../../components/Typography/Typography.tsx";
import { NavLink, useParams } from "react-router-dom";
import PartnerForm from "../../../components/AdminPanel/PartnerForm/PartnerForm.tsx";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";
import { getPartnerById } from "../../../api/PartnersAPI.ts";
import { PartnersType } from "./PartnersPage.tsx";

const AddPartnerPage = () => {
	const { id } = useParams();
	const [initialImage, setInitialImage] = useState<string>("");

	const [partnerData, setPartnerData] = useState<PartnersType>();

	useEffect(() => {
		if (id) {
			getPartnerById(Number(id))
				.then((data) => {
				setPartnerData(data);
				setInitialImage(
					`${import.meta.env.VITE_BASE_URL}/search/image/get?id=${data.image}`
				);
			})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id]);

	return (
		<>
			<div className="flex items-center pl-[36px] pr-[80px] py-[38px] h-[118px] bg-grey100 place-content-between">
				<Typography
					variant="h3"
					component="h1"
					className="text-[#FCFCFC] block"
				>
					Партнери
				</Typography>
				<NavLink to={"/admin/partners/"}>
					<IconClose />
				</NavLink>
			</div>
			<div className="px-[36px] pt-[48px]">
				<Typography variant="h4" component="h2" className="mb-[36px]">
					{id ? "Редагувати партнера" : "Додати партнера"}
				</Typography>
				{id ? (
					<PartnerForm
						id={partnerData?.id}
						partnerName={partnerData?.partnerName}
						url={partnerData?.url}
						image={initialImage}
						publication={partnerData?.publication}
						isEnabled={partnerData?.isEnabled}
					/>
				) : (
					<PartnerForm />
				)}
			</div>
		</>
	);
};
export default AddPartnerPage;
