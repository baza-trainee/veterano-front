import { FC, useState } from "react";
import { Form, Formik } from "formik";
import { validationSchema } from "../../../pages/admin/ProjectsPage/validationShema.ts";
import { createCard, editCard } from "../../../api/CardsApi.ts";
import AdminInput from "../Input/AdminInput.tsx";
import CitiesDropDown from "../DropwDown/CitiesDropDown.tsx";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import CategoryDropDown from "../DropwDown/CategoryDropDown.tsx";
import ImageInput from "../../ImageCroper/ImageInput.tsx";
import Switch from "../../Switch/Switch.tsx";
import Button from "../../Button/Button.tsx";
import CustomCalendar from "../Calendar/CustomCalendar.tsx";
import { useFormatDate } from "../../../hooks/useFormatDate.tsx";
import { useNavigate } from "react-router-dom";
import { blobUrlToBase64 } from "../BlobToBase64.ts";


interface ProjectsFormProps {
	cardId?: number
	title?: string;
	url?: string;
	description?: string;
	city?: string;
	country?: string;
	image?: string;
	isEnabled?: boolean;
	publication?: string;
	category?: string;
	type?: string
}

const ProjectsForm: FC<ProjectsFormProps>= ({type, cardId, title, url, description, city, country, image, isEnabled, publication, category  }) => {
	const [isOpen, setIsOpen] = useState(false);
	const formatDate = useFormatDate();
	const navigate = useNavigate();

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
			onSubmit={ async (values, {setSubmitting} ) => {
				try {
					const { cardId, isEnabled, city, country, category, image, ...rest } = values;
					const location = { city, country };
					const categoryArray = category.split(",").map(item => ({ categoryName: item.trim() }));
					const base64Image = await blobUrlToBase64(image);

					if (values && type === 'add') {
						const cardData = { ...rest, image: base64Image, location, categories: categoryArray };
						createCard(cardData)
							.then(() => navigate("/admin/projects"))
					} else {
						const cardData = { ...rest, cardId, isEnabled, image: base64Image, location, categories: categoryArray };
						editCard(cardData)
							.then(() => navigate("/admin/projects"))
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
			{({ values,  setFieldValue, errors, handleChange, isValid, handleSubmit }) => (

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
										name="image"
										className="bg-[white]"
										src={image}
										width={265}
										height={232}
										onChange={(image) => {
											setFieldValue("image", image);
										}}
										error={errors.image}
									/>

								</div>

								<div className="h-[226px] bg-white py-6 px-[42px] relative rounded">
									<div className={" h-full flex flex-col justify-between min-w-[200px]"}>
										<div className={"flex flex-col"}>
											<div className={"flex items-center mb-4 text-[14px] text-grey100"}>
												Стан: <span
												className={"block underline ml-4 w-[100px]"}>{values.isEnabled ? "активний" : "неактивний"}</span>
												<Switch
													isChecked={values.isEnabled || false}
													setIsChecked={(isChecked) => setFieldValue("isEnabled", isChecked)}
												/>
											</div>

											<div className={"flex items-center text-[14px] relative"}>
												Дата публікації:
												<button
													onClick={(e) => {
														e.preventDefault()
														setIsOpen(!isOpen);
													}}
													className={"underline cursor-pointer p-2"}>
													{values.publication}
												</button>
											</div>
										</div>
										<Button
											variant={"primary"}
											size={"large"}
											type="submit"
											disabled={!isValid}
										>Опублікувати</Button>
									</div>
									{isOpen &&
										<CustomCalendar
											setIsOpen={setIsOpen}
											onValueSelected={(date) => {
												if (date) {
													setFieldValue("publication", date);
												} else {
													setFieldValue("publication", formatDate);
												}
											}}
										/>}
								</div>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ProjectsForm;



