import axios from "axios";

const $host = axios.create({
	// baseURL: process.env.BASE_URL
});

export { $host };
