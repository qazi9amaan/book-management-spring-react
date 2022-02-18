const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/address";

class AddressService {
	async getAllAddress() {
		return axios.get(BASE_URL);
	}
	addAddress(address) {
		return axios.post(`${BASE_URL}/add`, address);
	}
	getAddressByUser(id) {
		return axios.get(BASE_URL + `/cus/${id}`);
	}
}

module.exports = new AddressService();
