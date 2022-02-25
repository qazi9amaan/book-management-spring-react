import moxios from "moxios";
import {
	getAllBooks,
	getBooksByCategory,
} from "./BookService";

const data = [
	{
		id: 2,
		title: "The Hobbit",
		price: 100.0,
		year: 2022,
		author: "Allen & Unwin",
		cover: "sadasda",
		description: "lorem12212",
		categoryName: "category name",
	},
];

describe("testing bookService", () => {
	beforeEach(() => {
		moxios.install();
	});
	afterEach(() => {
		moxios.uninstall();
	});

	it("returns the `books array`", async () => {
		await moxios.wait(() => {
			const req = moxios.requests.mostRecent();
			req.respondWith({
				status: 200,
				response: data,
			});
		});

		return getAllBooks().then((books) => {
			expect(books.data).toEqual(data);
		});
	});

	it("returns the `books array` of category", async () => {
		await moxios.wait(() => {
			const req = moxios.requests.mostRecent();
			req.respondWith({
				status: 200,
				response: req.url,
			});
		});
		return getBooksByCategory("test").then((books) => {
			expect(books.data).toEqual(
				"http://localhost:8080/api/books/c/test"
			);
		});
	});
});
