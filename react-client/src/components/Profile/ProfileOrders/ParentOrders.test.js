import React from "react";
import { mount, shallow } from "enzyme";
import {
	findByTestAttr,
	checkProp,
} from "../../../tests/testUtils";
import ParentOrders from "./ParentOrders";

const defaultProps = {
	orders: [],
	setchildView: () => {},
	setChildBooks: () => {},
};

const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return shallow(<ParentOrders {...setUpProps} />);
};

describe("Profile orders [parent] component test casses", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-profile-order-parent"
		);
		expect(component.length).toBe(1);
	});

	describe("when more books are", () => {
		it("available renders show more", () => {});
		it("not available renders ratings", () => {});
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(ParentOrders, defaultProps);
	});
});
