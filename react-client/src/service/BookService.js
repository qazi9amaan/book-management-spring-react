const axios = require("axios");

const BASE_URL = "http://localhost:8080/api/books";

class BookService {
	async getAllBooks() {
		return axios.get(BASE_URL);
	}
	async getBooksByCategory(category) {
		return axios.get(BASE_URL + "/c/" + category);
	}
}

module.exports = new BookService();

// [
// 	{
// 	  "id": 2,
// 	  "title": "The Hobbit",
// 	  "author": null,
// 	  "price": 100.0,
// 	  "year": 2022,
// 	  "": "Allen & Unwin",
// 	  "cover": null,
// 	  "description": null,
// 	  "categoryName": null,
// 	  "category": null
// 	}
//   ]
