import AdminInput from "../Input/AdminInput.tsx";
import ImageInput from "../../ImageCroper/ImageInput.tsx";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../Button/Button.tsx";
import { FC, useState } from "react";
import { useFormatDate } from "../../../hooks/useFormatDate.ts";
import Switch from "../../Switch/Switch.tsx";
import CustomCalendar from "../Calendar/CustomCalendar.tsx";
import { createPartner, editPartner } from "../../../api/PartnersAPI.ts";
import { blobUrlToBase64 } from "../BlobToBase64.tsx";

interface PartnerFormProps {
	id?: number;
	partnerName?: string;
	url?: string;
	image?: string;
	publication?: string;
	isEnabled?: boolean
}
const PartnerForm: FC<PartnerFormProps> = ({ id, isEnabled,publication, partnerName, url, image }) => {

	const [isOpen, setIsOpen] = useState(false);
	const formatDate = useFormatDate();

	const validationSchema = Yup.object({
		partnerName: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.required("Поле обов'язкове до заповнення"),
		url: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.required("Поле обов'язкове до заповнення"),
		image: Yup.mixed()
			.required("Поле обов'язкове до заповнення"),
		publication: Yup.string()
			.required("Поле обов'язкове до заповнення"),
	});
	return (
		<Formik
			initialValues={{
				id: id || 0,
				partnerName: partnerName || "",
				url: url || "",
				image: image || "",
				isEnabled: isEnabled || true,
				publication: publication || formatDate
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, { setSubmitting }) => {
				console.log(values);
				try {
					const { id, image, ...rest } = values;
					const base64Image = await blobUrlToBase64(image);
					if (id) {
						const data = { id, image: base64Image, ...rest }
						editPartner(data)
					} else {
						const data = { image: base64Image, ...rest }
						console.log(data);
						createPartner(data)
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
			{({ values, handleSubmit, handleChange, errors, touched, isValid, setFieldValue }) => (

				<Form onSubmit={e => {
					e.preventDefault();
					console.log('click')
					handleSubmit();
					console.log('click2')
				}}>
					<div className="flex gap-[20px]">
						<div className="flex flex-col w-[738px]">
							<div className="mb-[22px]">
								<AdminInput
									value={values.partnerName}
									error={errors.partnerName}
									name={"partnerName"}
									onChange={handleChange}
									placeholder={"Додати назву"}
									type={"text"}
								/>
							</div>
							<div className="mb-[22px]">
								<AdminInput
									value={values.url}
									error={errors.url && touched.url ? errors.url : undefined}
									name={"url"}
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
										id="image"
										src={values.image}
										name="image"
										className="bg-[white] !h-[121px] rounded"
										onChange={(img) => setFieldValue("image", img)}
										page={"partners"}
										style={{
											display: "block",
											opacity: 0,
											width: "0px",
											overflow: "hidden",
											position: "absolute",
										}}
									/>
								</div>

								<div className="h-[226px] bg-white py-6 px-[42px] relative ">
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
										<div className={'w-[210px]'}>
											<Button
												variant={"primary"}
												size={"large"}
												type="submit"
												disabled={!isValid}
											>Опублікувати</Button>
										</div>
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
