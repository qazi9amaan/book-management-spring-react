import axios from "axios";

const BASE_URL = "http://localhost:8080";
export const getSecretWord = () => {
	return axios.get(`${BASE_URL}`).then((res) => res.data);
};
