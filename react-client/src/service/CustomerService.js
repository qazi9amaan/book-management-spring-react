const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/customer";

class CustomerService {
	async getAllCustomers() {
		return axios.get(BASE_URL);
	}

	addCustomer(customer) {
		return axios.post(`${BASE_URL}/add`, customer);
	}

	getCustomer(id) {
		return axios.get(BASE_URL + `/phone/${id}`);
	}
}

module.exports = new CustomerService();
