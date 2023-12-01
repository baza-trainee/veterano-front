import { $host } from "./index.ts";

interface Login {
	email: string;
	password: string;
}
export const login = async ({ email, password }: Login) => {
	try {
		const { data } = await $host.post("/users/auth/login", {
			email,
      password,
		});
		return data;
	} catch (e) {
		console.error("Login error", e);
		throw new Error("Login error");
		return e;
	}
};
