import { ChangeEvent, useState } from "react";
import Input from "../../components/Input/Input";
import { string, object } from "yup";
import { Formik, Form } from "formik";

const LoginForm = () => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const validationSchema = object({
		login: string()
			.email("Введіть дійсний email")
			.test("domain", "Введіть дійсний email", (value) => {
				return !value?.endsWith(".ru") && !value?.endsWith(".by");
			})
			.required("Введіть дійсний email"),
		password: string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(52, "Ім’я повинно бути не більше 52 знаків")
			.required("Заповніть пусте поле"),
	});

	return (
		<>
			<Formik
				initialValues={{ name: "", email: "" }}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						sessionStorage.setItem("JWT", "JWT");
						console.log(values);
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
				<Form className="w-[518px]">
					<Input
						value={login}
						type="text"
						id="login"
						label="Логін"
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setLogin(e.target.value);
						}}
					/>
					<Input
						name="password"
						value={password}
						type="password"
						id="password"
						label="Пароль"
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setPassword(e.target.value);
						}}
					/>
				</Form>
			</Formik>
		</>
	);
};

export default LoginForm;
