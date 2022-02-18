const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/order";

export const getAllOrders = async () => axios.get(BASE_URL);
export const getOrder = (id) =>
	axios.get(`${BASE_URL}/${id}`);
export const updateStatus = (data, id) =>
	axios.put(`${BASE_URL}/change/${id}`, data);
