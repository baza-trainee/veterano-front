import Input from "../../components/Input/Input";
import { string, object } from "yup";
import { Formik, Form } from "formik";
import Button from "../../components/Button/Button";
import { login } from "../../api/AuthAPI";
import Typography from "../../components/Typography/Typography";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ className = "", ...props }: { className?: string }) => {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const validationSchema = object({
		email: string()
			.email("Введіть дійсний email")
			.test("domain", "Корабель там 🖕", (value) => {
				return !value?.endsWith(".ru") && !value?.endsWith(".by");
			})
			.required("Введіть дійсний email"),
		password: string()
			.min(8, "Поля повинні мати більше 2 символів")
			.max(52, "Ім’я повинно бути не більше 52 знаків")
			.required("Заповніть пусте поле"),
	});

	useEffect(() => {
		if (sessionStorage.getItem("JWT"))
			navigate("../../admin", { relative: "path" });
	});

	return (
		<>
			<div
				className={
					"rounded-[4px] px-[32px] py-[64px] bg-yellow50 w-[518px]" +
					" " +
					className
				}
				{...props}
			>
				<Typography variant="h1">Вхід</Typography>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={validationSchema}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						try {
							const res = await login(values);
							if (res) {
								sessionStorage.setItem("JWT", res.token);
								navigate("../../admin", { relative: "path" });
							}
						} catch (e) {
							setIsError(true);
							setTimeout(() => {
								setIsError(false);
							}, 5000);
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
									error={
										errors.email && touched.email ? errors.email : undefined
									}
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
			{isError && (
				<Alert
					sx={{
						position: "absolute",
						bottom: "40px",
						fontFamily: "e-Ukraine, sans-serif",
						bgcolor: "#D30018",
					}}
					variant="filled"
					severity="error"
				>
					Невірний логін або пароль. Перевірте дані
				</Alert>
			)}
		</>
	);
};

export default LoginForm;
