import axios from "axios";

const $host = axios.create({
	headers: { Authorization: `Bearer ${sessionStorage.getItem("JWT")}` },
	baseURL: import.meta.env.VITE_BASE_URL,
});

export { $host };
