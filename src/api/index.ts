import axios from "axios";

console.table(import.meta.env);
const $host = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

export { $host };
