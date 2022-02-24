import React from "react";
import { mount, shallow } from "enzyme";
import BookItem from "./BookItem";
import {
	checkProp,
	findByTestAttr,
} from "../../tests/testUtils";

const defaultProps = {
	book: {},
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

	it("doesnot throw warning with expected props", async () => {
		checkProp(BookItem, defaultProps);
	});
});
