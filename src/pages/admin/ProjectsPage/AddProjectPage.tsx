import Typography from "../../../components/Typography/Typography.tsx";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";
import { Form, Formik } from "formik";
import AdminInput from "../../../components/AdminPanel/Input/AdminInput.tsx";
import CitiesDropDown from "../../../components/AdminPanel/DropwDown/CitiesDropDown.tsx";
import CategoryDropDown from "../../../components/AdminPanel/DropwDown/CategoryDropDown.tsx";
import ImageInput from "../../../components/ImageCroper/ImageInput.tsx";
import Switch from "../../../components/Switch/Switch.tsx";
import Button from "../../../components/Button/Button.tsx";
import CustomCalendar from "../../../components/AdminPanel/Calendar/CustomCalendar.tsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { createCard } from "../../../api/CardsApi.ts";
import { validationSchema } from "./validationShema.ts";
import { useFormatDate } from "../../../hooks/useFormatDate.tsx";

const AddProjectPage = () => {

	const [isOpen, setIsOpen] = useState(false)
	const formatDate = useFormatDate();

	return (
		<>
			<div className={"bg-grey100 "}>
				<div className={"px-[36px] pt-[38px] pb-[38px] pr-[80px] h-[118px] flex justify-between"}>
					<Typography variant={"h3"} component={"h3"} className={"text-white"}>Проєкти</Typography>
					<NavLink to={'/admin/projects/'}><IconClose /></NavLink>

				</div>
			</div>
			<div className={"pt-[48px] pl-[34px] pr-[80px] pb-[128px] bg-grey30 h-[100vh]"}>
				<Typography variant={"h4"} component={"h4"} className={"text-black mb-5"}>Додати проєкт</Typography>
				<Formik
					initialValues={{
						title: "",
						url: "",
						description: "",
						city: "",
						country: "",
						image: "",
						isEnabled: true,
						publication: formatDate,
						category: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						const { isEnabled, city, country, category, ...rest } = values;
						const location = { city, country };
						const categories = [{ categoryName: category }];
						const cardData = { ...rest, location, categories };
						console.log(cardData);
						createCard(cardData);
					}}

				>

					{({ values, setFieldValue, errors, handleChange, handleSubmit }) => (
						<Form onSubmit={handleSubmit}>
							<div className="flex gap-[20px]">
								<div className="flex flex-col w-2/3">
									<div className="mb-[22px]">
										<AdminInput
											type={"text"}
											value={values.title}
											placeholder={"Додати назву проекту"}
											name={"title"}
											onChange={handleChange}
											error={errors.title} />
									</div>
									<div className="mb-[22px]">
										<AdminInput
											type={"text"}
											value={values.url}
											placeholder={"Додати посилання"}
											name={"url"}
											onChange={handleChange}
											error={errors.url} />
									</div>
									<div>
										<textarea
											name={"description"}
											value={values.description}
											onChange={handleChange}
											className={`resize-none pt-[10px] pl-[10px] pr-[53px] w-full h-[548px] border rounded ${errors.description ? "placeholder:text-error30" : "placeholder:text-grey50"} placeholder:text-[14px] `}
											placeholder={errors.description ? errors.description : "Введіть текст тут"}
										/>
									</div>
								</div>
								<div className="flex flex-col w-1/3">
									<div className="mb-[22px]">
										<CitiesDropDown
											value={values.city}
											name={"city"}
											onChange={handleChange}
											placeholder={"Місто / країна"}
											onValueSelected={({ city, country }) => {
												setFieldValue("city", city);
												setFieldValue("country", country);
											}}
											error={errors.city || errors.country} />
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
											error={errors.city}
										/>
									</div>
									<div className="flex flex-col">
										<div className="mb-[22px] bg-white rounded">
											<ImageInput
												onSelectedImg={(preview) => setFieldValue("image", preview)}
											/>
										</div>
										<div className="h-[226px] bg-white py-6 px-[74px] relative">
											<div className={" h-full flex flex-col justify-between"}>
												<div className={"flex flex-col"}>
													<div className={"flex items-center mb-4 text-[14px]"}>
														Стан: <span
														className={"block underline ml-4 w-[100px]"}>{values.isEnabled ? "активний" : "неактивний"}</span>
														<Switch
															isChecked={values.isEnabled}
															setIsChecked={(isChecked) => setFieldValue("isEnabled", isChecked)}
														/>
													</div>

													<div className={"flex items-center text-[14px] relative"}>
														Дата публікації:
														<button onClick={() => setIsOpen(!isOpen)} className={'underline cursor-pointer p-2'}>
															{values.publication}
														</button>
													</div>
												</div>
												<Button variant={"primary"} size={"large"} type={"submit"}>Опублікувати</Button>
											</div>
											{isOpen &&
												<CustomCalendar
													setIsOpen={setIsOpen}
													onValueSelected={(date) => {
														if(date){
															setFieldValue("publication", date)
														} else {
															setFieldValue("publication", formattedCurrentDate)
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
			</div>

		</>
	);
};

export default AddProjectPage;