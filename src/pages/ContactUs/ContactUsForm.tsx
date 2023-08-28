import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { createFeedback } from "../../api/FeedbackAPI";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import NavigationLink from "../../components/Links/NavigationLink.tsx";
import ModalWindow from "../../components/Modal/ModalWindow.tsx";
import Textarea from "../../components/Textarea/Textarea";
import Typography from "../../components/Typography/Typography";
import { useMedia } from "../../hooks/useMedia.tsx";

const ContactUsForm = () => {
	const { isMobile, isDesktop } = useMedia();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const maxMessage = isMobile
		? "Скоротіть текст до 300 знаків"
		: "Просимо скоротити ваше повідомлення до 300 знаків";
	const validationSchema = Yup.object({
		name: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(30, "Ім’я повинно бути не більше 30 знаків")
			.required("Заповніть пусте поле"),
		email: Yup.string()
			.email("Введіть дійсний email")
			.test("domain", "Введіть дійсний email", (value) => {
				return !value?.endsWith(".ru") && !value?.endsWith(".by");
			})
			.required("Введіть дійсний email"),
		message: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(300, maxMessage)
			.required("Введіть ваше повідомлення"),
	});
	return (
		<div className={"contact-feedback"}>
			<div className={"md:w-[22%] lg:w-[298px]"}>
				<Typography
					variant={isDesktop ? "h4" : "h5"}
					component={isDesktop ? "h4" : "h5"}
					className={"mt-11"}
				>
					Напишіть нам
				</Typography>
			</div>
			<Formik
				initialValues={{
					name: "",
					email: "",
					message: "",
				}}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						const response = await createFeedback({
							name: values.name,
							email: values.email,
							message: values.message,
						});
						if (response) {
							setIsModalOpen(true);
						} else {
							console.log("Помилка від сервера");
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
				{({ values, handleBlur, handleChange, errors, touched, isValid }) => (
					<Form
						className={
							"md:flex md:w-[55%] md:flex-col lg:w-[55%] lg:flex-row lg:flex-wrap lg:max-w-[800px] "
						}
					>
						<Input
							id={"name"}
							value={values.name}
							error={errors.name && touched.name ? errors.name : undefined}
							name={"name"}
							minLength={2}
							type={"text"}
							label={"Ім'я"}
							onChange={handleChange}
							onBlur={handleBlur}
							className={
								"md:w-full md:mr-[20px] lg:flex-grow-0 lg:flex-shrink lg:basis-[305px] "
							}
						/>
						<Input
							id={"email"}
							value={values.email}
							error={errors.email && touched.email ? errors.email : undefined}
							name={"email"}
							type={"email"}
							label={"Email"}
							onChange={handleChange}
							onBlur={handleBlur}
							className={
								"md:w-full lg:flex-grow lg:flex-shrink-0 lg:basis-[413px] "
							}
						/>

						<Textarea
							id={"message"}
							placeholder={"Введіть ваше повідомлення"}
							value={values.message}
							name={"message"}
							onChange={handleChange}
							onBlur={handleBlur}
							error={
								errors.message && touched.message ? errors.message : undefined
							}
							className={
								"md:w-full relative mt-[38px] mb-[54px] md:mb-[46px] lg:basis-[785px] lg:flex-grow lg:flex-shrink-0 "
							}
						/>

						<Button
							className={"md:w-[167px]"}
							variant={"primary"}
							disabled={!isValid}
							size={"large"}
							type={"submit"}
						>
							Надіслати
						</Button>
					</Form>
				)}
			</Formik>
			<ModalWindow
				className={"p-5 bg-yellow50 w-full md:mt-[10%] md:w-[480px] h-[400px]"}
				active={isModalOpen}
				setActive={setIsModalOpen}
			>
				<div className={"text-black mt-[30px]"}>
					<Typography
						variant={"h4"}
						component={"p"}
						className={"text-center font-bold"}
					>
						Ваше повідомлення надіслане
					</Typography>
					<div className={"flex justify-center mt-10"}>
						<img src="/images/success-sent.svg" alt="check" />
					</div>
					<div className={"flex justify-center w-full mt-12"}>
						<NavigationLink to={"/"} variant={"primary"} size={"large"}>
							До головної
						</NavigationLink>
					</div>
				</div>
			</ModalWindow>
		</div>
	);
};
export default ContactUsForm;
