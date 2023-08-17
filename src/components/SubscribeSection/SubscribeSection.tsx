import Typography from "../Typography/Typography.tsx";
import { useMedia } from "../../hooks/useMedia.tsx";
import { Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import Checkbox from "../Checkbox/Checkbox.tsx";
import Link from "../Links/Link.tsx";



const SubscribeSection = () => {

	const { isDesktop, isMobile } = useMedia();


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
	});

	return (
		<section>
			<div className={"subscribe-wrapper md:min-h-[606px] lg:min-h-[626px] "}>
				<div className={"text-center md:ml-[38%] lg:ml-[23%]"}>
					<Typography variant={isDesktop ? "h2" : "h3"} component={isDesktop ? "h2" : "h3"}>Підписка на
						новини</Typography>
				</div>
				<Formik
					initialValues={{name: "", email: ""}}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => {
						console.log(values);
						setSubmitting(false);
					}}
					validateOnChange={false}
					validateOnBlur={true}>


					{ ({values, handleBlur, handleChange, errors, touched, isValid }) => (
						<Form className={'flex flex-col md:items-start md:ml-[50%] '}>
							<div>
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
									style={{ minWidth: isMobile ? '200px' : '350px'}}/>

								<Input
									id={"email"}
									value={values.email}
									error={errors.email && touched.email ? errors.email : undefined}
									name={"email"}
									type={"email"}
									label={"Email"}
									onChange={handleChange}
									onBlur={handleBlur}
									className={"md:w-full "}
									style={{ minWidth: isMobile ? '200px' : '350px'}}/>
							</div>

							<div className={'mt-[56px] md:w-[350px] lg:w-full'}>
								<Checkbox
									id={'subscribe'}
									checked={true}
									onCheck={(e) => console.log(e.target.checked)}>
									<p className={'text-[14px] leading-[26px] md:w-[230px] lg:w-full lg:text-[18px]'}>Я погоджуюся з <Link variant={'underlineFooter'} to={'/rules'}
																					style={{color: 'black'}}>правилами</Link> сайту khyst.site</p>
								</Checkbox>
								<Button className={"md:w-[167px] mt-[38px] lg:mt-[42px]"} variant={"primary"} disabled={!isValid} size={"large"}
												type={"submit"}>Надіслати</Button>
							</div>

						</Form>
					)}
				</Formik>
			</div>

		</section>
	);
};

export default SubscribeSection;