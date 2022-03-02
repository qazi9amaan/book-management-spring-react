import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import Books from ".";
import {
	checkProp,
	findByTestAttr,
} from "../../tests/testUtils";
import BookItem from "./BookItem";
import BookDetails from "../BookDetails";
import BookService from "../../service/BookService";
import { DummyData } from "../../tests/dummyData";

const books = DummyData.bookArray;

const initialState = {
	books: [],
	selectedBook: {
		title: null,
	},
	error: null,
	isLoading: true,
};

const defaultProps = {
	category: "all",
};

const mockSetCurrentGuess = jest.fn();
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useState: (i) => [initialState, mockSetCurrentGuess],
}));

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	return mount(<Books {...setupProps} />);
};

describe("Testing books component", () => {
	beforeAll(() => {
		moxios.install();
	});
	afterAll(() => {
		moxios.uninstall();
	});

	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-books"
		);
		expect(component.length).toBe(1);
	});

	it("should not renders `BookDetails` until selected", async () => {
		const wrapper = setup();
		expect(wrapper.find(BookDetails).exists()).toBe(false);
	});

	it("renders without any error with required props", () => {
		checkProp(Books, defaultProps);
	});

	describe("when `getAllBooks()` is called", () => {
		it("return the correct repsonse", async () => {
			await moxios.wait(() => {
				const req = moxios.requests.mostRecent();
				req.respondWith({
					status: 200,
					response: books,
				});
			});
			return BookService.getAllBooks().then((respsonse) => {
				expect(respsonse.data).toEqual(books);
			});
		});
		//response error has been tested.
		it("return error response", async () => {
			await moxios.wait(() => {
				const req = moxios.requests.mostRecent();
				const errResp = {
					status: 500,
					response: {
						msg: "The server is unable to respond",
					},
				};
				req.reject(errResp);
			});

			return BookService.getAllBooks().catch((error) => {
				// eslint-disable-next-line jest/no-conditional-expect
				expect(error.status).toEqual(500);
			});
		});
	});

	it("`all` is passed should call the getAllBooks()", async () => {
		jest
			.spyOn(React, "useEffect")
			.mockImplementationOnce((f) => f());
		jest.spyOn(BookService, "getAllBooks");
		setup();
		expect(BookService.getAllBooks).toHaveBeenCalledTimes(
			1
		);
	});

	describe("when api call is made", () => {
		describe("should render loading response", () => {
			let wrapper;
			beforeEach(() => {
				React.useState = jest.fn(() => [
					initialState,
					jest.fn(),
				]);

				wrapper = setup();
			});
			it("should render loading", async () => {
				const component = await findByTestAttr(
					wrapper,
					"loading-spinner"
				);
				expect(component.length).toBe(1);
			});

			it("should match the default loading snapshot", () => {
				expect(wrapper).toMatchSnapshot();
			});
		});

		//testing error state
		describe("when request fails", () => {
			let wrapper;
			beforeEach(() => {
				const initalValue = {
					...initialState,
					isLoading: false,
					error: "An error has occured",
				};

				React.useState = jest.fn(() => [
					initalValue,
					jest.fn(),
				]);
				wrapper = setup();
			});
			it("should render error msg", async () => {
				const wrapper = setup();
				const component = await findByTestAttr(
					wrapper,
					"error-message"
				);
				expect(component.length).toBe(1);
			});

			it("should match the error snapshot", () => {
				expect(wrapper).toMatchSnapshot();
			});
		});

		//testing categories state
		describe("when request is success", () => {
			let wrapper;
			beforeEach(() => {
				const initalValue = {
					...initialState,
					isLoading: false,
					books: books,
				};

				React.useState = jest.fn(() => [
					initalValue,
					jest.fn(),
				]);

				wrapper = setup();
			});
			it("should render items", async () => {
				expect(wrapper.find(BookItem).length).toBe(1);
			});

			it("should match the success snapshot", () => {
				expect(wrapper).toMatchSnapshot();
			});
		});
	});
});
