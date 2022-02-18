const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/customer";

export const getAllCustomers = () => axios.get(BASE_URL);
export const getCustomer = (id) =>
	axios.get(`${BASE_URL}/${id}`);
