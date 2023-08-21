import { ChangeEvent, useState } from "react";
import Input from "../../components/Input/Input";

const LoginForm = () => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	return (
		<form className="w-[518px]">
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
				id="login"
				label="Пароль"
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setPassword(e.target.value);
				}}
			/>
		</form>
	);
};

export default LoginForm;
