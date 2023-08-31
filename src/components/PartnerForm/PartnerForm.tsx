import AdminInput from "../../components/AdminPanel/Input/AdminInput";
import ImageInput from "../../components/ImageCroper/ImageInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { useFormatDate } from "../../hooks/useFormatDate.ts";
import Switch from "../Switch/Switch.tsx";
import CustomCalendar from "../AdminPanel/Calendar/CustomCalendar.tsx";

interface PartnerFormProps {
	id?: string;
	name?: string;
	link?: string;
	img?: string;
	publication?: string;
}
const PartnerForm: React.FC<PartnerFormProps> = ({ id,publication, name, link, img }) => {

	const [isOpen, setIsOpen] = useState(false);
	const formatDate = useFormatDate();

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.required("Заповніть пусте поле"),
		link: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.required("Заповніть пусте поле"),
		img: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.required("Заповніть пусте поле"),
	});
	return (
		<Formik
			initialValues={{
				name: name || "",
				link: link || "",
				img: img || "",
				isEnabled: true,
				publication: publication || "vvbvbvb"
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					if (id) {
						console.log({ id, ...values });
					} else {
						console.log({ ...values });
					}
				} catch (error) {
					console.log(error);
				} finally {
					setSubmitting(false);
				}
			}}
			validateOnChange={false}
			validateOnBlur={true}
		>
			{({ values, handleChange, errors, touched, isValid, setFieldValue }) => (
				<Form>
					<div className="flex gap-[20px]">
						<div className="flex flex-col w-[738px]">
							<div className="mb-[22px]">
								<AdminInput
									value={values.name}
									error={errors.name && touched.name ? errors.name : undefined}
									name={"name"}
									onChange={handleChange}
									placeholder={"Додати назву"}
									type={"text"}
								/>
							</div>
							<div className="mb-[22px]">
								<AdminInput
									value={values.link}
									error={errors.link && touched.link ? errors.link : undefined}
									name={"link"}
									onChange={handleChange}
									placeholder={"Додати посилання"}
									type={"text"}
								/>
							</div>
						</div>
						<div className="flex flex-col w-[305px]">
							<div className="flex flex-col">
								<div className="mb-[22px] bg-white rounded">
									<ImageInput
										imgHeight={100}
										imgWidth={200}
										id="img"
										src={img}
										name="img"
										className="bg-[white] !h-[121px] rounded"
										onChange={(img) => setFieldValue("img", img)}
										style={{
											display: "block",
											opacity: 0,
											width: "0px",
											overflow: "hidden",
											position: "absolute",
										}}
									/>
								</div>

								<div className="h-[226px] bg-white py-6 px-[74px] relative">
									<div className={" h-full flex flex-col justify-between"}>
										<div className={"flex flex-col"}>
											<div className={"flex items-center mb-4 text-[14px]"}>
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
										<Button variant={"primary"} size={"large"} type={"submit"} disabled={!isValid} >Опублікувати</Button>
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

export default PartnerForm;
