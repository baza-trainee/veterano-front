import Typography from "../../../components/Typography/Typography.tsx";
import { useNavigate, useParams } from "react-router-dom";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";
import { getCardById } from "../../../api/CardsApi.ts";
import { useEffect, useState } from "react";
import { CardType } from "./interfaces/CardType.ts";
import ProjectsForm from "../../../components/AdminPanel/Projects/ProjectsForm.tsx";


const EditProjectPage = () => {
	const [cardInfo, setCardInfo] = useState<CardType>();
	const { id } = useParams<string>();
	const [initialImage, setInitialImage] = useState<string>("");
	const navigate = useNavigate()

	useEffect(() => {
		if (id) {
			getCardById(id)
				.then((data) => {
					setCardInfo(data);
					const imageId = data.imageId;
					setInitialImage(
						`${import.meta.env.VITE_BASE_URL}/search/image/get?id=${imageId}`
					);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id]);

	const initialCategories = cardInfo?.categories
		.map((category) => category.categoryName)
		.join(", ");

	return (
		<>
			<div className={"bg-grey100 "}>
				<div
					className={
						"px-[36px] pt-[38px] pb-[38px] pr-[80px] h-[118px] flex justify-between"
					}
				>
					<Typography variant={"h3"} component={"h3"} className={"text-white"}>
						Проєкти
					</Typography>
					<IconClose onClick={() => navigate(-1)}/>
				</div>
			</div>
			<div className={"pt-[48px] pl-[34px] pr-[80px] pb-[128px] bg-grey30 "}>
				<Typography
					variant={"h4"}
					component={"h4"}
					className={"text-black mb-[36px]"}
				>
					Редагувати проєкт
				</Typography>
				{cardInfo && (
					<ProjectsForm
						cardId={cardInfo?.cardId}
						title={cardInfo?.title}
						url={cardInfo?.url}
						description={cardInfo?.description}
						location={cardInfo?.location}
						image={initialImage}
						isEnabled={cardInfo?.isEnabled}
						publication={cardInfo?.publication}
						category={initialCategories}
					/>
				)}
			</div>
		</>
	);
};

export default EditProjectPage;
