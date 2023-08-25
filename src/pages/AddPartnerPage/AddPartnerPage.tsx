import { useEffect, useState } from "react";
import AdminInput from "../../components/AdminPanel/Input/AdminInput";
import ImageInput from "../../components/ImageCroper/ImageInput";
import Typography from "../../components/Typography/Typography";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const AddPartnerPage = () => {
	const { id } = useParams();
	const [img, setImg] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [link, setLink] = useState<string>("");

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
	useEffect(() => {
		console.log(id);
		if (id) {
			setImg(
				"https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fHww&w=1000&q=80"
			);
			setName("name");
			setLink("link");
		}
	}, [id]);
	return (
		<div>
			<Typography variant="h4" component="h2">
				{id ? "Редагувати партнера" : "Додати партнера"}
			</Typography>
			{id
				? name && (
						<Formik
							initialValues={{
								name: name,
								link: link,
								img: img,
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
							{({
								values,
								handleChange,
								errors,
								touched,
								isValid,
								setFieldValue,
							}) => (
								<Form>
									<div className="grid grid-cols-3">
										<div className="col-span-2 flex gap-[24px] flex-col">
											<AdminInput
												id="name"
												value={values.name}
												error={
													errors.name && touched.name ? errors.name : undefined
												}
												name={"name"}
												onChange={handleChange}
												placeholder={"Додати назву"}
											/>
											<AdminInput
												id="link"
												value={values.link}
												error={
													errors.link && touched.link ? errors.link : undefined
												}
												name={"link"}
												onChange={handleChange}
												placeholder={"Додати посилання"}
											/>
										</div>
										<div className="col-span-1">
											<ImageInput
												id="img"
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
										</div>
										<button type="submit">submit</button>
									</div>
								</Form>
							)}
						</Formik>
				  )
				: ""}
		</div>
	);
};
export default AddPartnerPage;
