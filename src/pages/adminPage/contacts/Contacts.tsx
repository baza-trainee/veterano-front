import { AdminHeader } from "../../../components/AdminHeader";
import Typography from "../../../components/Typography/Typography";
import Button from "../../../components/Button/Button";
import AdminInput from "../../../components/AdminPanel/Input/AdminInput";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationSchema } from "./schema.ts";
import { submitForm } from "./submit.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { ContactsType, getContacts } from "../../../api/ContactsAPI.ts";

export const Contacts = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [contacts, setContacts] = useState<ContactsType | null>();
	useEffect(() => {
		getContacts().then((data) => {
			setContacts(data);
			isLoading && setIsLoading(false);
		});
	}, [isLoading]);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/[^0-9+]/g, '');

		if (value.startsWith("+380")) {
			value = value.replace(/(\d{3})(\d{2})?(\d{3})?(\d{4})?/, '$1 $2 $3 $4').trim();
		}

		e.target.value = value;
	};

	return (
		<div>
			<AdminHeader name="Контакти" />
			<div className="pl-9 pr-[80px] pt-12  ">
				{!isLoading && (
					<Formik
						validationSchema={validationSchema}
						initialValues={{
							phone: `+${contacts?.firstPhoneNumber}` || "+380",
							secondPhone: `+${contacts?.secondPhoneNumber}` || "+380",
							email: contacts?.email || "",
						}}
						onSubmit={async (values, { resetForm }) => {
							await submitForm(values);
							setIsLoading(true);
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
									<Field
										as={AdminInput}
										placeholder="Телефон"
										name="phone"
										onInput={handleInput}

									/>
									<ErrorMessage
										name="phone"
										component="div"
										className="text-red-500"
									/>

									<Field
										as={AdminInput}
										placeholder="Телефон"
										name="secondPhone"
										onInput={handleInput}
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
				)}
			</div>
		</div>
	);
};

