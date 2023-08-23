import Typography from "../../../components/Typography/Typography.tsx";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";
import { Form, Formik } from "formik";
import AdminInput from "../../../components/AdminPanel/Input/AdminInput.tsx";
import CitiesDropDown from "../../../components/AdminPanel/DropwDown/CitiesDropDown.tsx";
import CategoryDropDown from "../../../components/AdminPanel/DropwDown/CategoryDropDown.tsx";
import ImageInput from "../../../components/ImageCroper/ImageInput.tsx";
import Switch from "../../../components/Switch/Switch.tsx";
import * as Yup from "yup";
import Button from "../../../components/Button/Button.tsx";
import { useState } from "react";


const AddProjectPage = () => {
	const [startDate, setStartDate] = useState(new Date());
	const validationSchema = Yup.object({
		title: Yup.string()
			.required("Поле обов'язкове до заповнення"),
		url: Yup.string()
			.required("Поле обов'язкове до заповнення"),
		description: Yup.string()
			.required("Поле обов'язкове до заповнення"),
		city: Yup.string()
			.required("Поле обов'язкове до заповнення"),
		country: Yup.string()
			.required("Поле обов'язкове до заповнення"),
		image: Yup.mixed()
			.required("Поле обов'язкове до заповнення")
			.test('fileType', 'Непідтримуваний тип файлу', (value) => {
				const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
				return value && supportedTypes.includes((value as File).type);
			}),
		publication: Yup.string()
			.required("Поле обов'язкове до заповнення"),
		category: Yup.string()
			.required("Поле обов'язкове до заповнення"),

	});


	return (
		<>
			<div className={"bg-grey100 "}>
				<div className={"px-[36px] pt-[38px] pb-[38px] pr-[80px] h-[118px] flex justify-between"}>
					<Typography variant={"h3"} component={"h3"} className={"text-white"}>Проєкти</Typography>
					<IconClose />
				</div>
			</div>
			<div className={"pt-[48px] pl-[34px] pr-[80px] pb-[128px] bg-grey30 h-[100vh]"}>
				<Typography variant={"h4"} component={"h4"} className={"text-black"}>Додати проєкт</Typography>
				<Formik
					initialValues={{
						title: "",
						url: "",
						description: "",
						city: "",
						country: "",
						image: "",
						isEnabled: true,
						publication: "",
						category: "",
					}}
					validationSchema={validationSchema}
					onSubmit={values => {
						console.log(values);
					}}>

					{({ values, setFieldValue, errors, submitForm, handleChange, handleSubmit }) => (
						<Form>
							<div className="flex gap-[20px]" >
								<div className="flex flex-col w-2/3">
									<div className="mb-[22px]">
										<AdminInput
											type={"text"}
											value={values.title}
											placeholder={"Додати назву"}
											name={"title"}
											onChange={handleChange} />
									</div>
									<div className="mb-[22px]">
										<AdminInput
											type={"text"}
											value={values.url}
											placeholder={"Додати посилання"}
											name={"url"}
											onChange={handleChange} />
									</div>
									<div>
										<textarea
											name={'description'}
											value={values.description}
											onChange={handleChange}
											className="resize-none pt-[10px] pl-[10px] pr-[53px] w-full h-[548px] border rounded placeholder:text-[14px] placeholder:text-grey50 invalid:placeholder:text-error30"
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
											placeholder={"Країна / місто"}
											onValueSelected={({ city, country }) => {
												setFieldValue("city", city);
												setFieldValue("country", country);
											}} />
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
											}} />
									</div>
									<div className="flex flex-col">
										<div className="mb-[22px] bg-white rounded">
											<ImageInput onChange={handleChange} />
										</div>
										<div className="h-[226px] bg-white py-6 px-[74px]">
											<div className={' h-full flex flex-col justify-between' }>
												<div className={'flex flex-col'}>
													<div className={'flex items-center mb-4 text-[14px]'}>
														Стан: <span className={'block underline ml-4 w-[100px]'}>{values.isEnabled ? "активний" : "неактивний"}</span>
														<Switch
															isChecked={values.isEnabled}
															setIsChecked={(isChecked) => setFieldValue("isEnabled", isChecked)}
														/>
													</div>

													<div className={'flex items-center text-[14px]'}>
														Дата публікації:

													</div>
												</div>

												<Button variant={'primary'} size={'large'} type={'submit'}>Опублікувати</Button>
											</div>

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