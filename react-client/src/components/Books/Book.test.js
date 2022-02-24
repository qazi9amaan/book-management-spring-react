import React from "react";
import { mount, shallow } from "enzyme";
import Sidebar from "./";
import moxios from "moxios";
import Books from "./";
import {
	checkProp,
	findByTestAttr,
} from "../../tests/testUtils";
import BookItem from "./BookItem";
import BookDetails from "../BookDetails";

const books = [
	{
		bid: 10,
		title: "A Game of Thrones",
		author: "George R. R. Martin",
		price: 1999,
		year: 1996,
		publisher: "Bantam Spectra (US) Voyager Books (UK)",
		cover: "cover img",
		description: "A Game of ",
		ratings: [
			{
				ratingId: 68,
				mcid: "25",
				mbid: "10",
				rating: "3",
			},
			{
				ratingId: 77,
				mcid: "73",
				mbid: "10",
				rating: "4",
			},
		],
	},
];

const defaultProps = {
	category: "all",
};

const mockSetCurrentGuess = jest.fn();
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useState: (i) => [books, mockSetCurrentGuess],
}));

const setup = (props = {}) => {
	return mount(<Books {...defaultProps} />);
};

describe("Testing books component", () => {
	beforeEach(() => {
		moxios.install();
	});
	afterEach(() => {
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

	it("renders `BookItem` by default", async () => {
		const wrapper = setup();
		expect(wrapper.find(BookItem).exists()).toBe(true);
	});

	it("should not renders `BookDetails` until selected", async () => {
		const wrapper = setup();
		expect(wrapper.find(BookDetails).exists()).toBe(false);
	});

	it("renders without any error with required props", () => {
		checkProp(Books, defaultProps);
	});
});
