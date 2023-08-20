import axios from "axios";

const $host = axios.create({
	baseURL: 'http://45.94.157.117:8080/api/v1/'
});

export {
	$host,
};