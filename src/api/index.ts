import axios from "axios";
const $host = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

export { $host };
