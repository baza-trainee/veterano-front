import AdminInput from "../Input/AdminInput.tsx";
import ImageInput from "../../ImageCroper/ImageInput.tsx";
import * as Yup from "yup";
import { FC, useEffect, useState } from "react";
import { useFormatDate } from "../../../hooks/useFormatDate.ts";
import { createPartner, editPartner } from "../../../api/PartnersAPI.ts";
import { blobUrlToBase64 } from "../BlobToBase64.ts";
import { Form, Formik } from "formik";
import PublishComponent from "../PublishComponent.tsx";
import { useNavigate } from "react-router-dom";

interface PartnerFormProps {
	id?: number;
	partnerName?: string;
	url?: string;
	image?: string;
	publication?: string;
	isEnabled?: boolean;
}

const PartnerForm: FC<PartnerFormProps> = ({ id, isEnabled, publication, partnerName, url, image }) => {

	const formatDate = useFormatDate();
	const navigate = useNavigate();
	const [initialState, setInitialState] = useState<PartnerFormProps>({});

	useEffect(() => {
		setInitialState({
			id: id || 0,
			partnerName: partnerName || "",
			url: url || "",
			image: image || "",
			isEnabled: isEnabled || false,
			publication: publication || formatDate,
		});
	}, [id, partnerName, url, image, isEnabled, publication ]);

	const validationSchema = Yup.object({
		partnerName: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(100, "Поля повинні мати не більше 100 символів")
			.matches(/^[a-zA-Zа-яА-Я0-9()&, \-\p{L}]+$/u, 'Поле не повинно містити спеціальних символів')
			.required("Поле обов'язкове до заповнення. Введіть назву"),
		url: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.matches(/^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z-/]{2,}$/, "Поле повинно містити URL в форматі https://domain.com")
			.required("Поле обов'язкове до заповнення. Введіть посилання"),
		image: Yup.mixed()
			.required("Поле обов'язкове до заповнення"),
		publication: Yup.string()
			.required("Поле обов'язкове до заповнення"),
	});

	return (
		<Formik
			initialValues={{
				id: id || null,
				partnerName: partnerName || "",
				url: url || "https://",
				image: image || "",
				isEnabled: isEnabled || false,
				publication: publication || formatDate,
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, { setSubmitting }) => {

				try {
					setSubmitting(true)
					if (id) {
						const changedValues = Object.keys(initialState).reduce<Partial<PartnerFormProps>>((acc, key) => {

							if ((initialState as any)[key] !== (values as any)[key]) {
								(acc as any)[key] = (values as any)[key];
							}
							return acc;
						}, {});

						const { image, ...rest } = changedValues;
						const base64Image = image ? await blobUrlToBase64(image) : undefined;
						const data = { id, image: base64Image, ...rest };
						editPartner(data)
							.then(() => navigate("/admin/partners"));
					} else {
						const { id, image, ...rest } = values;
						const base64Image = await blobUrlToBase64(image);
						const data = { image: base64Image, ...rest };
						createPartner(data)
							.then(() => navigate("/admin/partners"));
					}
				} catch (error) {
					console.log(error);
				} finally {
					setSubmitting(false);
				}
			}}
			validateOnChange={true}
			validateOnBlur={true}
			enableReinitialize={true}

		>
			{({ values, handleBlur, handleSubmit, touched,  handleChange, errors, isValid, setFieldValue }) => (
				<Form onSubmit={e => {
					e.preventDefault();
					handleSubmit();
				}}>
					<div className="flex gap-[20px]">
						<div className="flex flex-col w-[738px]">
							<div className="mb-[22px]">
								<AdminInput
									type={"text"}
									value={values.partnerName}
									placeholder={"Додати назву"}
									name={"partnerName"}
									onChange={handleChange}
									error={touched.partnerName ? errors.partnerName : ''}
									onBlur={handleBlur}
								/>

							</div>
							<div className="mb-[22px]">
								<AdminInput
									value={values.url}
									error={touched.url ? errors.url : ''}
									onBlur={handleBlur}
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
										id="image"
										src={image}
										name="image"
										className="bg-[white] !h-[121px] rounded"
										onChange={(img) => setFieldValue("image", img)}
										page={"partners"}
										error={touched.image ? errors.image : ''}
									/>
								</div>

								<PublishComponent
									isEnabled={values.isEnabled}
									onChange={(isChecked: boolean) => setFieldValue("isEnabled", isChecked)}
									publication={values.publication}
									isValid={isValid}
									onValueSelected={(date: string) => {
										if (date) {
											setFieldValue("publication", date);
										} else {
											setFieldValue("publication", formatDate);
										}
									}}

								/>
							</div>
						</div>
					</div>

				</Form>
			)}
		</Formik>
	);
};

export default PartnerForm;
