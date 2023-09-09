import { AdminHeader } from "../../../components/AdminHeader";
import Typography from "../../../components/Typography/Typography";
import Button from "../../../components/Button/Button";
import AdminInput from "../../../components/AdminPanel/Input/AdminInput";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationSchema } from "./schema.ts";
import { submitForm } from "./submit.ts";

export const Contacts = () => {
	return (
		<div>
			<AdminHeader name="Контакти" />
			<div className="pl-9 pr-[80px] pt-12 ">
				<Formik
					validationSchema={validationSchema}
					initialValues={{ phone: "", secondPhone: "", email: "" }}
					onSubmit={(values, { resetForm }) => {
						submitForm(values);
						resetForm();
					}}
				>
					{() => (
						<Form>
							<div className="flex justify-between mb-[18px]">
								<Typography variant="h2" className="font-medium text-2xl">
									Редагувати контакти
								</Typography>
								<div className="hidden md:block">
									<Button variant="primary" type="submit">
										Опублікувати
									</Button>
								</div>
							</div>
							<div className="flex flex-col gap-4 max-w-[739px]">
								<Field as={AdminInput} placeholder="Телефон" name="phone" />
								<ErrorMessage
									name="phone"
									component="div"
									className="text-red-500"
								/>

								<Field
									as={AdminInput}
									placeholder="Телефон"
									name="secondPhone"
								/>
								<ErrorMessage
									name="secondPhone"
									component="div"
									className="text-red-500"
								/>

								<Field
									as={AdminInput}
									placeholder="Контактний e-mail"
									name="email"
								/>
								<ErrorMessage
									name="email"
									component="div"
									className="text-red-500"
								/>
							</div>
							<div className="block md:hidden mt-4">
								<Button variant="primary" type="submit">
									Опублікувати
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
