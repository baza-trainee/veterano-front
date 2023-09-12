import { FC, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { validationSchema } from "../../../pages/admin/ProjectsPage/validationShema.ts";
import { createCard, editCard } from "../../../api/CardsApi.ts";
import AdminInput from "../Input/AdminInput.tsx";
import CitiesDropDown from "../DropwDown/CitiesDropDown.tsx";
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
	location?: {
		city: string;
		country: string;
	} | string;
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
																							 location,
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
			location: location && typeof location === "object" ? `${location.country}/${location.city}` : "",
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
				location: location && typeof location === "object" ? `${location.country}/${location.city}` : "",
				image: image || "",
				isEnabled: isEnabled || true,
				publication: publication || formatDate,
				category: category || "",
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					if (values && type === "add") {
						const { isEnabled, location, category, image, ...rest } = values;
						let locationObject;
						if (typeof location === "string") {
							const locationArray = location.split("/");
							locationObject = { country: locationArray[0].trim(), city: locationArray[1].trim() };
						} else if (typeof location === "object") {
							locationObject = location;
						}
						const categoryArray = category.split(",").map(item => ({ categoryName: item.trim() }));
						const base64Image = await blobUrlToBase64(image);
						const cardData = {
							...rest,
							image: base64Image,
							location: locationObject,
							categories: categoryArray,
						};
						createCard(cardData)
							.then(() => navigate(-1));
					} else {

						const changedValues = Object.keys(initialState).reduce<Partial<ProjectsFormProps>>((acc, key) => {
							if ((initialState as any)[key] !== (values as any)[key]) {
								(acc as any)[key] = (values as any)[key];
							}
							return acc;
						}, {});

						const { location, category, image, ...rest } = changedValues;
						const categoryArray = category ? category.split(",").map(item => ({ categoryName: item.trim() })) : undefined;
						let locationObject;

						if (typeof location === "string") {
							const locationArray = location.split("/");
							locationObject = { country: locationArray[0].trim(), city: locationArray[1].trim() };
						} else if (typeof location === "object") {
							locationObject = location;
						}
						const base64Image = image ? await blobUrlToBase64(image) : undefined;
						const cardData = {
							cardId, ...rest,
							image: base64Image,
							location: locationObject,
							categories: categoryArray,
						};
						editCard(cardData)
							.then(() => {
								navigate(-1)
							})
							.catch((error) => {
								console.error("Помилка при запиті:", error);
							});
					}
				} catch (e) {
					console.log("Error submitting", e);
				} finally {
					setSubmitting(false);
				}
			}}
			validateOnChange={true}
			validateOnBlur={true}
			enableReinitialize={true}

		>
			{({ values, setFieldValue, handleBlur, touched, errors, handleChange, isValid, handleSubmit }) => (

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
									onBlur={handleBlur}
									error={touched.title ? errors.title : ""} />
							</div>
							<div className="mb-[22px]">
								<AdminInput
									type={"text"}
									value={values.url}
									placeholder={"Додати посилання"}
									name={"url"}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.url ? errors.url : ""} />
							</div>
							<div>
										<textarea
											name={"description"}
											value={values.description}
											onChange={handleChange}
											onBlur={handleBlur}
											className={`resize-none pt-[10px] font-light pl-[10px] pr-[53px] w-full h-[548px] border rounded placeholder:text-grey50 placeholder:text-[14px] placeholder:font-light placeholder:leading-[26px] `}
											placeholder={"Введіть текст тут"}
										/>
								{touched.description && errors.description &&
									<div className={"text-error50 font-light text-[16px] leading-6 mt-1 pl-2"}>{errors.description}</div>}
							</div>
						</div>
						<div className="flex flex-col w-[305px]">
							<div className="mb-[22px]">
								<CitiesDropDown
									inputDisplayValue={location && location}
									value={values.location}
									name={"location"}
									onChange={handleChange}
									placeholder={"Країна / місто"}
									onBlur={handleBlur}
									onValueSelected={({ country, city }) => {
										setFieldValue("location", `${country}/${city}`);
									}}
									error={touched.location && errors.location ? errors.location : ""}
								/>
								{touched.location && errors.location &&
									<div className={"text-error50 font-light text-[16px] leading-6 mt-1 pl-2"}>{errors.location}</div>}
							</div>
							<div className="mb-[22px]">
								<CategoryDropDown
									value={values.category}
									name={"category"}
									onChange={e => {
										handleChange(e);
									}}
									onBlur={handleBlur}
									placeholder={"Категорія"}
									onValueSelected={(category) => {
										setFieldValue("category", category);
									}}
									error={touched.category && errors.category ? errors.category : ""}
								/>
								{touched.category && errors.category &&
									<div className={"text-error50 font-light text-[16px] leading-6 mt-1 pl-2"}>{errors.category}</div>}
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
									onChange={(isChecked) => setFieldValue("isEnabled", isChecked)}
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



