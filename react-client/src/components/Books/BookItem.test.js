import React from "react";
import { mount, shallow } from "enzyme";
import BookItem, { getBookRatings } from "./BookItem";
import {
	checkProp,
	findByTestAttr,
} from "../../tests/testUtils";

const defaultProps = {
	book: {
		ratings: [],
	},
	setSelectedBook: jest.fn(),
};

const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return shallow(<BookItem {...setUpProps} />);
};

describe("Book item component test casses", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"book-item"
		);
		expect(component.length).toBe(1);
	});

	it("should call `setSelectedBook` on click", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"book-item"
		);
		component.simulate("click");
		expect(defaultProps.setSelectedBook).toHaveBeenCalled();
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(BookItem, defaultProps);
	});

	describe("getBookRatings", () => {
		it("0 when no ratings", () => {
			const ratings = getBookRatings(defaultProps.book);
			expect(ratings).toEqual(0);
		});
		it("3.5 when 2 ratings", () => {
			const ratings = getBookRatings({
				ratings: [
					{
						rating: 2,
					},
					{
						rating: 5,
					},
				],
			});
			expect(ratings).toEqual(3.5);
		});
	});
});
