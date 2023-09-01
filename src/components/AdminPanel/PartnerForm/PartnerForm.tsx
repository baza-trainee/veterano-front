import AdminInput from "../Input/AdminInput.tsx";
import ImageInput from "../../ImageCroper/ImageInput.tsx";
import * as Yup from "yup";
import { FC } from "react";
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
	isEnabled?: boolean
}
const PartnerForm: FC<PartnerFormProps> = ({ id, isEnabled,publication, partnerName, url, image }) => {

	const formatDate = useFormatDate();
	const navigate = useNavigate();

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
				try {
					const { id, image, ...rest } = values;
					const base64Image = await blobUrlToBase64(image);
					if (id) {
						const data = { id, image: base64Image, ...rest }
						console.log(data);
						editPartner(data)
							.then(() => navigate("/admin/partners"));
					} else {
						const data = { image: base64Image, ...rest }
						createPartner(data)
							.then(() => navigate("/admin/partners"));
					}
				} catch (error) {
					console.log(error);
				} finally {
					setSubmitting(false);
				}
			}}
			validateOnChange={false}
			validateOnBlur={true}
			enableReinitialize={true}
		>
			{({ values, handleSubmit, handleChange, errors, isValid, setFieldValue }) => (

				<Form onSubmit={e => {
					e.preventDefault();
					handleSubmit();
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
									error={errors.url}
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
										error={errors.image}
									/>
								</div>

								<PublishComponent
									isEnabled={values.isEnabled}
									setIsChecked={(isChecked: boolean) => setFieldValue("isEnabled", isChecked)}
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
