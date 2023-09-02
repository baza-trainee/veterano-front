import axios from "axios";

console.log(import.meta.env.VITE_BASE_URL);
const $host = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

export { $host };
