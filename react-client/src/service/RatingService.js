const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/c/ratings";

class RatingsService {
	addRating(data) {
		return axios.post(`${BASE_URL}/add`, data);
	}
}

module.exports = new RatingsService();
