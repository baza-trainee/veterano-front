import axios from "axios";

const $host = axios.create({
	baseURL: import.meta.env.BASE_URL
});

export {
	$host,
};