const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/category";

class CategoryService {
	async getAllCategories() {
		return axios.get(BASE_URL);
	}
}

module.exports = new CategoryService();
