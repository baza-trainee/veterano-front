import Input from "../../components/Input/Input";
import { string, object } from "yup";
import { Formik, Form } from "formik";
import Button from "../../components/Button/Button";
import { login } from "../../api/AuthAPI";

const LoginForm = () => {
	const validationSchema = object({
		email: string()
			.email("Введіть дійсний email")
			.test("domain", "Введіть дійсний email", (value) => {
				return !value?.endsWith(".ru") && !value?.endsWith(".by");
			})
			.required("Введіть дійсний email"),
		password: string()
			.min(8, "Поля повинні мати більше 2 символів")
			.max(52, "Ім’я повинно бути не більше 52 знаків")
			.required("Заповніть пусте поле"),
	});

	return (
		<>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						sessionStorage.setItem("JWT", "JWT");
						const res = await login(values);
						console.log(res);
					} catch (e) {
						console.log(e);
					} finally {
						setSubmitting(false);
					}
					resetForm();
				}}
				validateOnChange={true}
				validateOnBlur={true}
			>
				{({ values, handleBlur, handleChange, errors, touched, isValid }) => (
					<Form className="w-[518px]">
						<Input
							value={values.email}
							error={errors.email && touched.email ? errors.email : undefined}
							type="text"
							name="email"
							id="email"
							label="Логін"
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Input
							value={values.password}
							error={
								errors.password && touched.password
									? errors.password
									: undefined
							}
							name="password"
							type="password"
							id="password"
							label="Пароль"
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Button disabled={!isValid} size="large" type="submit">
							Увійти
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default LoginForm;
