import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { createFeedback } from "../../api/FeedbackAPI";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
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
			.matches(
				/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]*(?:[ ]{0,1}[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+)*$/,
				"Не дозволено числа, спеціальні символи чи два або більше пробіли підряд"
			)
			.required("Заповніть пусте поле"),
		email: Yup.string()
			.email("Введіть дійсний email")
			.test("domain", "Корабель там 🖕", (value) => {
				return !value?.endsWith(".ru") && !value?.endsWith(".by");
			})
			.matches(
				/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Введіть дійсний email"
			)
			.required("Введіть дійсний email"),
		message: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(300, maxMessage)
			.matches(
				/^[a-zA-Z0-9а-яА-ЯіІїЇєЄґҐ.,!?:-]*$/,
				"Не дозволено спеціальні символи"
			)
			.required("Введіть ваше повідомлення"),
	});
	return (
		<div className={"contact-feedback md:gap-[26px] lg:gap-[30px]"}>
			<div className={"md:w-[22%] lg:w-[298px]"}>
				<Typography
					variant={isDesktop ? "h4" : "h5"}
					component={isDesktop ? "h4" : "h5"}
					className={"mt-11 lg:w-[295px]"}
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
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						const response = await createFeedback({
							name: values.name,
							email: values.email,
							message: values.message,
						});
						if (response) {
							setIsModalOpen(true);
							resetForm();
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
							"w-[100%] md:flex md:flex-col lg:w-[100%]  lg:flex-wrap lg:max-w-[100%] "
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
								"md:mb-[28px] md:w-full md:mr-[20px] lg:flex-grow-0 lg:flex-shrink lg:basis-[64px]"
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
								"md:w-full lg:flex-grow lg:flex-shrink-0  lg:basis-[64px]"
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
								"md:w-full relative mt-[38px] mb-[54px] md:mb-[46px]  lg:mt-[54px] lg:flex-grow lg:flex-shrink-0 lg:w-[738px]"
							}
						/>

						<Button
							className={"h-[48px] md:w-[167px] text-[18px] leading-[28px]"}
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
				className={
					"h-[568px] w-full rounded bg-yellow50 flex items-center md:justify-center w-full md:w-[523px] md:h-[284px] lg:w-[628px] lg:h-[286px]"
				}
				active={isModalOpen}
				style={{ top: isMobile ? "0px" : "30%" }}
				setActive={setIsModalOpen}
			>
				<div
					className={
						"text-black w-[272px] h-[160px] mt-[232px] md:mt-0 md:w-full flex justify-center items-center "
					}
				>
					<Typography
						variant={isDesktop ? "h4" : "h5"}
						component={"p"}
						className={"text-center"}
					>
						Ваше повідомлення надіслане
					</Typography>
				</div>
			</ModalWindow>
		</div>
	);
};
export default ContactUsForm;
