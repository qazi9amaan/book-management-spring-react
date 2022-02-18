const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/stats";

export const getAllStats = () => axios.get(BASE_URL);
