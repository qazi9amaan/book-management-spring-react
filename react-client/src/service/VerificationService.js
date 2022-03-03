const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/verify";

class VerficationService {
	getOtp(phoneNumber) {
		return axios.post(BASE_URL + "/get-otp", {
			phoneNumber: phoneNumber,
		});
	}
	verifyOtp(body) {
		return axios.post(BASE_URL + "/verify-otp", body);
	}
}

module.exports = new VerficationService();
