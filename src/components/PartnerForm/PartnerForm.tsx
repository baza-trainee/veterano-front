import AdminInput from "../../components/AdminPanel/Input/AdminInput";
import ImageInput from "../../components/ImageCroper/ImageInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
interface PartnerFormProps {
	id?: string;
	name?: string;
	link?: string;
	img?: string;
}
const PartnerForm: React.FC<PartnerFormProps> = ({ id, name, link, img }) => {
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
					<div className="space-x-[20px] grid grid-cols-6">
						<div className="col-span-4 flex gap-[24px] flex-col">
							<AdminInput
								id="name"
								value={values.name}
								error={errors.name && touched.name ? errors.name : undefined}
								name={"name"}
								onChange={handleChange}
								placeholder={"Додати назву"}
							/>
							<AdminInput
								id="link"
								value={values.link}
								error={errors.link && touched.link ? errors.link : undefined}
								name={"link"}
								onChange={handleChange}
								placeholder={"Додати посилання"}
							/>
						</div>
						<div className="col-span-1 w-[305px]">
							<ImageInput
								id="img"
								src={img}
								name="img"
								className="bg-[white]"
								onChange={(img) => setFieldValue("img", img)}
								style={{
									display: "block",
									opacity: 0,
									width: "0px",
									overflow: "hidden",
									position: "absolute",
								}}
							/>
							<Button disabled={!isValid} type="submit" className="w-full">
								submit
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default PartnerForm;
