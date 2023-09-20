import { Alert } from "@mui/lab";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/AuthAPI";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Typography from "../../components/Typography/Typography";
import {
	emailValidationSchema,
	passwordValidationSchema,
} from "../../validationFields/validationFields";
import { object } from "yup";

const LoginForm = ({ className = "", ...props }: { className?: string }) => {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const validationSchema = object({
		email: emailValidationSchema,
		password: passwordValidationSchema,
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
				{isError && (
					<Alert
						sx={{
							position: "absolute",
							top: "-90px",
							fontFamily: "e-Ukraine, sans-serif",
							backgroundColor: "#D30018",
							padding: "20px 40px",
							color: "#FCFCFC",
							height: "66px",
							display: "flex",
							"& .MuiAlert-icon": {
								padding: "0",
								fontSize: "24px",
								marginRight: "16px",
								opacity: "1",
							},
							"& .MuiAlert-message": {
								padding: "0",
								fontSize: "14px",
								fontWeight: "300",
								lineHeight: "26px",
							},
						}}
						variant="filled"
						severity="error"
					>
						Невірний логін або пароль. Перевірте дані
					</Alert>
				)}
				<Typography variant="h2" className={"px-[20px]"}>
					Вхід
				</Typography>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={validationSchema}
					onSubmit={async (values, { setSubmitting, resetForm }) => {
						try {
							const res = await login(values);
							if (res) {
								sessionStorage.setItem("JWT", res.token.access_token);
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
						<Form className="flex flex-col gap-[45px] px-[20px] items-center ">
							<div className="flex flex-col gap-2 mb-[55px] shrink-0 w-full">
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
									style={{ width: "100%" }}
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
									style={{ width: "100%" }}
								/>
							</div>
							<div className="flex w-[129px] justify-center items-center flex-shrink-0 ">
								<Button
									disabled={!isValid}
									size="large"
									type="submit"
									className={"text-[18px] leading-[28px] h-[48px]"}
								>
									Увійти
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default LoginForm;
