import Input from "../../components/Input/Input";
import { string, object } from "yup";
import { Formik, Form } from "formik";
import Button from "../../components/Button/Button";
import { login } from "../../api/AuthAPI";
import Typography from "../../components/Typography/Typography";
import { useState } from "react";

const LoginForm = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
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
		<div className="rounded-[4px] px-[32px] py-[96px] bg-yellow50 w-[518px]">
			<Typography variant="h1">Вхід</Typography>
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
					<Form className="flex flex-col gap-[92px]">
						<div className="flex flex-col gap-[32px] shrink-0">
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
								type={isVisible ? "text" : "password"}
								id="password"
								label="Пароль"
								onChange={handleChange}
								onBlur={handleBlur}
								passwordVisible={isVisible}
								onMouseDown={() => setIsVisible((prev) => !prev)}
							/>
						</div>
						<div className="flex flex-col gap-[32px] items-center">
							<Button
								className="w-[129px]"
								disabled={!isValid}
								size="large"
								type="submit"
							>
								Увійти
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LoginForm;
