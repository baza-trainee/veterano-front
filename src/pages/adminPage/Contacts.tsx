import React, { useState } from "react";
import Typography from "../../components/Typography/Typography";
import { AdminHeader } from "../../components/AdminHeader";
import Button from "../../components/Button/Button";
import AdminInput from "../../components/AdminPanel/Input/AdminInput";

export const Contacts = () => {
	const [firstPhone, setFirstPhone] = useState<string>("");
	const [secondPhone, setSecondPhone] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [secondEmail, setSecondEmail] = useState<string>("");

	const handleSubmit = async () => {
		const dataToSend = {
			firstPhone,
			secondPhone,
			email,
			secondEmail,
		};

		try {
			const response = await fetch("URL_СЕРВЕРА", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSend),
			});

			if (response.ok) {
				// Обробка успішної відповіді від сервера, якщо потрібно
			} else {
				// Обробка помилки від сервера, якщо потрібно
			}
		} catch (error) {
			// Обробка помилки під час виконання запиту
		}
	};

	return (
		<div>
			<AdminHeader name="Контакти" />
			<div className="pl-9 pr-[80px] pt-12 ">
				<div className="flex justify-between mb-[18px]">
					<Typography variant="h2" className="font-medium text-2xl">
						Редагувати контакти
					</Typography>
					<Button variant="primary" onClick={handleSubmit}>
						Опублікувати
					</Button>
				</div>
				<div className="flex flex-col gap-4 max-w-[739px]">
					<AdminInput
						value={firstPhone}
						placeholder="Телефон"
						name="phone"
						onChange={(e) => setFirstPhone(e.target.value)}
					/>
					<AdminInput
						value={secondPhone}
						placeholder="Телефон"
						name="secondPhone"
						onChange={(e) => setSecondPhone(e.target.value)}
					/>
					<AdminInput
						value={email}
						placeholder="Контактний e-mail"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<AdminInput
						value={secondEmail}
						placeholder="e-mail для обробки звернень через форму зворотнього зв’язку"
						name="secondEmail"
						onChange={(e) => setSecondEmail(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};
