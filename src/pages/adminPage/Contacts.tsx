import { useState } from "react";
import { AdminHeader } from "../../components/AdminHeader";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { submitForm } from "./submitForm";
import AdminInput from "../../components/AdminPanel/Input/AdminInput";

export const Contacts = () => {
	const [firstPhone, setFirstPhone] = useState<string>("");
	const [secondPhone, setSecondPhone] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	return (
		<div>
			<AdminHeader name="Контакти" />
			<div className="pl-9 pr-[80px] pt-12 ">
				<div className="flex justify-between mb-[18px]">
					<Typography variant="h2" className="font-medium text-2xl">
						Редагувати контакти
					</Typography>
					<Button
						variant="primary"
						onClick={() => submitForm({ firstPhone, secondPhone, email })}
					>
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
				</div>
			</div>
		</div>
	);
};
