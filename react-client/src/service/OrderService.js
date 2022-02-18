const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/order";

class OrderService {
	async getAllOrdersFor(id) {
		return axios.get(`${BASE_URL}/u/${id}`);
	}
	async placeOrder(order) {
		return axios.post(`${BASE_URL}/add`, order);
	}
}

module.exports = new OrderService();
