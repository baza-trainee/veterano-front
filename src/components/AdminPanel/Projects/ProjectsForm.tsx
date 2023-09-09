import { FC, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { validationSchema } from "../../../pages/admin/ProjectsPage/validationShema.ts";
import { createCard, editCard } from "../../../api/CardsApi.ts";
import AdminInput from "../Input/AdminInput.tsx";
import CitiesDropDown from "../DropwDown/CitiesDropDown.tsx";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import CategoryDropDown from "../DropwDown/CategoryDropDown.tsx";
import ImageInput from "../../ImageCroper/ImageInput.tsx";
import { useFormatDate } from "../../../hooks/useFormatDate.tsx";
import { useNavigate } from "react-router-dom";
import { blobUrlToBase64 } from "../BlobToBase64.ts";
import PublishComponent from "../PublishComponent.tsx";


interface ProjectsFormProps {
	cardId?: number;
	title?: string;
	url?: string;
	description?: string;
	city?: string;
	country?: string;
	image?: string;
	isEnabled?: boolean;
	publication?: string;
	category?: string;
	type?: string;
}

const ProjectsForm: FC<ProjectsFormProps> = ({
																							 type,
																							 cardId,
																							 title,
																							 url,
																							 description,
																							 city,
																							 country,
																							 image,
																							 isEnabled,
																							 publication,
																							 category,
																						 }) => {
	const formatDate = useFormatDate();
	const navigate = useNavigate();
	const [initialState, setInitialState] = useState<ProjectsFormProps>({});

	useEffect(() => {
		setInitialState({
			cardId: cardId || 0,
			title: title || "",
			url: url || "",
			description: description || "",
			city: city || "",
			country: country || "",
			image: image || "",
			isEnabled: isEnabled || true,
			publication: publication || formatDate,
			category: category || "",
		});
	}, []);
	return (
		<Formik
			initialValues={{
				cardId: cardId || 0,
				title: title || "",
				url: url || "",
				description: description || "",
				city: city || "",
				country: country || "",
				image: image || "",
				isEnabled: isEnabled || true,
				publication: publication || formatDate,
				category: category || "",
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					if (values && type === "add") {
						const { isEnabled, city, country, category, image, ...rest } = values;
						const location = { city, country };
						const categoryArray = category.split(",").map(item => ({ categoryName: item.trim() }));
						const base64Image = await blobUrlToBase64(image);
						const cardData = { ...rest, image: base64Image, location, categories: categoryArray };
						createCard(cardData)
							.then(() => navigate("/admin/projects"));
					} else {

						const changedValues = Object.keys(initialState).reduce<Partial<ProjectsFormProps>>((acc, key) => {
							if ((initialState as any)[key] !== (values as any)[key]) {
								(acc as any)[key] = (values as any)[key];
							}
							return acc;
						}, {});

						const { city, country, category, image, ...rest } = changedValues;

						const location = city && country ? { city, country } : undefined;
						const categoryArray = category ? category.split(",").map(item => ({ categoryName: item.trim() })) : undefined;
						const base64Image = image ? await blobUrlToBase64(image) : undefined;

						const cardData = { cardId, ...rest, image: base64Image, location, categories: categoryArray };
						editCard(cardData)
							.then(() => navigate("/admin/projects"));
					}
				} catch (e) {
					console.log("Error submitting", e);
				} finally {
					setSubmitting(false);
				}
			}}
			validateOnChange={false}
			validateOnBlur={true}
			enableReinitialize={true}

		>
			{({ values, setFieldValue, errors, handleChange, isValid, handleSubmit }) => (

				<Form onSubmit={e => {
					e.preventDefault();
					handleSubmit();
				}}>
					<div className="flex gap-[20px]">
						<div className="flex flex-col w-[738px]">
							<div className="mb-[22px]">
								<AdminInput
									type={"text"}
									value={values.title}
									placeholder={"Додати назву проекту"}
									name={"title"}
									onChange={handleChange}
									error={errors.title as string} />
							</div>
							<div className="mb-[22px]">
								<AdminInput
									type={"text"}
									value={values.url}
									placeholder={"Додати посилання"}
									name={"url"}
									onChange={handleChange}
									error={errors.url as string} />
							</div>
							<div>
										<textarea
											name={"description"}
											value={values.description}
											onChange={handleChange}
											className={`resize-none pt-[10px] pl-[10px] pr-[53px] w-full h-[548px] border rounded ${errors.description ? "placeholder:text-error30" : "placeholder:text-grey50"} placeholder:text-[14px] `}
											placeholder={errors.description ? errors.description as string : "Введіть текст тут"}
										/>
							</div>
						</div>
						<div className="flex flex-col w-[305px]">
							<div className="mb-[22px]">
								<CitiesDropDown
									inputDisplayValue={values.city ? `${capitalizeFirstLetter(values.city || "")}/${capitalizeFirstLetter(values.country || "")}` : ""}
									value={values.city}
									name={"city"}
									onChange={handleChange}
									placeholder={"Місто / країна"}
									onValueSelected={({ city, country }) => {
										setFieldValue("city", city);
										setFieldValue("country", country);
									}}
									error={errors.city as string || errors.country as string} />
							</div>
							<div className="mb-[22px]">
								<CategoryDropDown
									value={values.category}
									name={"category"}
									onChange={e => {
										handleChange(e);
									}}
									placeholder={"Категорія"}
									onValueSelected={(category) => {
										setFieldValue("category", category);
									}}
									error={errors.category as string}
								/>
							</div>
							<div className="flex flex-col">
								<div className="mb-[22px] bg-white rounded">
									<ImageInput
										id="image"
										src={image}
										name="image"
										className="bg-[white]"
										onChange={(img) => setFieldValue("image", img)}
										error={errors.image}
										width={265}
										height={232}
									/>
								</div>
								<PublishComponent
									isEnabled={values.isEnabled}
									setIsChecked={(isChecked) => setFieldValue("isEnabled", isChecked)}
									publication={values.publication}
									isValid={isValid}
									onValueSelected={(date) => {
										if (date) {
											setFieldValue("publication", date);
										} else {
											setFieldValue("publication", formatDate);
										}
									}} />

							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ProjectsForm;



