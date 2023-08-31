import { useEffect, useState } from "react";

import Typography from "../../../components/Typography/Typography.tsx";
import { NavLink, useParams } from "react-router-dom";
import PartnerForm from "../../../components/PartnerForm/PartnerForm.tsx";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";

const AddPartnerPage = () => {
	const { id } = useParams();
	const [img, setImg] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [link, setLink] = useState<string>("");

	useEffect(() => {
		console.log(id);
		if (id) {
			setImg(
				"https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fHww&w=1000&q=80"
			);
			setName("name");
			setLink("link");
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
					name && <PartnerForm id={id} name={name} link={link} img={img} />
				) : (
					<PartnerForm />
				)}
			</div>
		</>
	);
};
export default AddPartnerPage;
