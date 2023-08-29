import Typography from "../../../components/Typography/Typography.tsx";
import { NavLink, useParams } from "react-router-dom";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";
import { Formik } from "formik";
import { editCard, getCardById, getCardImage } from "../../../api/CardsApi.ts";
import { useEffect, useState } from "react";
import { validationSchema } from "./validationShema.ts";
import { CardType } from "./interfaces/CardType.ts";
import ProjectForm from "../../../components/AdminPanel/Projects/ProjectForm.tsx";

const EditProjectPage = () => {
	const [cardInfo, setCardInfo] = useState<CardType>();
	const { id } = useParams<string>();
	const [initialImage, setInitialImage] = useState<string | null>()

	useEffect(() => {
		if (id) {
			getCardById(id)
				.then(data => {
					setCardInfo(data);
					const imageId = data.imageId || 0;
					return getCardImage(imageId);
				})
				.then(imageBlob => {
					setInitialImage(imageBlob);
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, [id]);


	const initialCategories = cardInfo?.categories.map(category => category.categoryName).join(", ");

	return (
		<>
			<div className={"bg-grey100 "}>
				<div className={"px-[36px] pt-[38px] pb-[38px] pr-[80px] h-[118px] flex justify-between"}>
					<Typography variant={"h3"} component={"h3"} className={"text-white"}>Проєкти</Typography>
					<NavLink to={"/admin/projects/"}><IconClose /></NavLink>

				</div>
			</div>
			<div className={"pt-[48px] pl-[34px] pr-[80px] pb-[128px] bg-grey30 "}>
				<Typography variant={"h4"} component={"h4"} className={"text-black mb-[36px]"}>Редагувати проєкт</Typography>
				<Formik
					initialValues={{
						cardId: cardInfo?.cardId || 0,
						title: cardInfo?.title || "",
						url: cardInfo?.url || "",
						description: cardInfo?.description || "",
						city: cardInfo?.location.city || "",
						country: cardInfo?.location.country || "",
						image: initialImage || "",
						isEnabled: cardInfo?.isEnabled,
						publication: cardInfo?.publication || "",
						category: initialCategories || "",
					}}
					validationSchema={validationSchema}
					enableReinitialize={true}
					validateOnChange={false}
					validateOnBlur={true}
					onSubmit={(values) => {
						const { city, country, category, ...rest } = values;
						const location = { city, country };
						const categoryArray = category.split(",").map(item => ({ categoryName: item.trim() }));
						const cardData = { ...rest, location, categories: categoryArray };
						editCard(cardData)
					}}
				>
					{({ values, setFieldValue, errors, handleChange, isValid, handleSubmit }) => (
						<ProjectForm
							values={values}
							errors={errors}
							setFieldValue={setFieldValue}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							isValid={isValid}
						/>
					)}
				</Formik>
			</div>

		</>
	);
};

export default EditProjectPage;