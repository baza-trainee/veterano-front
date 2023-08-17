import Typography from "../components/Typography/Typography.tsx";
import { useMedia } from "../hooks/useMedia.tsx";
import { MdEmail, MdPhone } from "react-icons/md";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Input from "../components/Input/Input.tsx";
import Textarea from "../components/Textarea/Textarea.tsx";
import Button from "../components/Button/Button.tsx";

interface FormValues {
	name: string;
	email: string;
	message: string;
}

const ContactUs = () => {

	const { isMobile, isTablet, isDesktop } = useMedia();

	const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		console.log(values);
		setSubmitting(false);
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(30, "Ім’я повинно бути не більше 30 знаків")
			.required("Заповніть пусте поле"),
		email: Yup.string()
			.email("Введіть дійсний email")
			.test("domain", "Введіть дійсний email", value => {
				return !value?.endsWith(".ru") && !value?.endsWith(".by");
			})
			.required("Введіть дійсний email"),
		message: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(300, "Скоротіть текст до 300 знаків")
			.required("Введіть ваше повідомлення"),
	});

	return (
		<>
			<div
				className={"min-w-[230px] h-[240px] lg:h-[290px] flex flex-col justify-end"}
				style={{
					backgroundImage: isMobile ? "url(/images/contact-320w.svg)" : isTablet ? "url(/images/contact-720w.svg)" : "url(/images/contact-1440w.svg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}>
				<Typography variant={isDesktop ? "h1" : "h2"}
										component={isDesktop ? "h1" : "h2"}
										className={"text-white w-[209px] ml-4 mb-7 md:w-full md:ml-6 lg:ml-[80px]"}>Зв'язатись з
					нами</Typography>
			</div>

			<div className={"contact-wrapper"}>
				<div className={"contact-info"}>
					<div className={"md:w-[22%] lg:w-[295px]"}>
						<Typography variant={isDesktop ? "h4" : "h5"} component={isDesktop ? "h4" : "h5"}>Ми завжди на
							зв’язку</Typography>
					</div>
					<ul className={"text-black text-[18px] leading-7 font-normal"}>
						<li>
							<MdPhone size={24} />
							<p>+38 044 XXX XX XX</p>
						</li>
						<li>
							<MdPhone size={24} />
							<p>+38 044 XXX XX XX</p>
						</li>
						<li>
							<MdEmail size={24} />
							<p>info@baza-trainee.tech</p>
						</li>
					</ul>
				</div>
				<div className={"contact-feedback"}>
					<div className={"md:w-[34%] lg:w-[298px]"}>
						<Typography variant={isDesktop ? "h4" : "h5"} component={isDesktop ? "h4" : "h5"} className={"mt-11"}>Напишіть
							нам</Typography>
					</div>
					<Formik
						initialValues={
							{
								name: "",
								email: "",
								message: "",
							}
						}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values, handleChange, errors, isValid }) => (
							<Form className={"md:flex md:flex-wrap "}>
								{/*<div className={'md:flex md:justify-between'}>*/}
								<Input
									id={"name"} value={values.name}
									error={errors.name}
									name={"name"}
									type={"text"}
									label={"Ім'я"}
									onChange={handleChange}
									className={"md:flex-grow-0 md:flex-shrink md:basis-[160px] lg:basis-[305px] md:mr-[20px]"} />
								<Input
									id={"email"}
									value={values.email}
									error={errors.email}
									name={"email"}
									type={"email"}
									label={"Email"}
									onChange={handleChange}
									className={"md:flex-grow md:flex-shrink-0 md:basis-[320px] lg:basis-[413px] "} />
								{/*</div>*/}
								<Textarea
									id={"message"}
									placeholder={"Введіть ваше повідомлення"}
									value={values.message}
									name={"message"}
									onChange={handleChange}
									error={errors.message}
									className={"relative mt-[38px] mb-[54px] md:mb-[46px] lg:basis-[738px] md:flex-grow md:flex-shrink-0 md:basis-[535px] "}
								/>


								<Button className={"md:w-[167px]"} variant={"primary"} disabled={!isValid} size={"large"}
												type={"submit"}>Надіслати</Button>
							</Form>
						)}

					</Formik>
				</div>

			</div>
		</>
	);
};

export default ContactUs;