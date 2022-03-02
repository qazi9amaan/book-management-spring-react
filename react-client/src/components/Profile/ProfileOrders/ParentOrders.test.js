import React from "react";
import { mount, shallow } from "enzyme";
import {
	findByTestAttr,
	checkProp,
} from "../../../tests/testUtils";
import ParentOrders from "./ParentOrders";
import RatingComponent from "../../Ratings";
import { DummyData } from "../../../tests/dummyData";

const singleBookOrder = DummyData.singleBookOrder; // 1

const multipleBooksOrder = DummyData.multipleBooksOrder; //2

const multipleOrders = DummyData.multipleOrders; //2

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
		it("available renders show more", async () => {
			const wrapper = setup({
				orders: multipleBooksOrder,
			});
			const component = await findByTestAttr(
				wrapper,
				"show-more-books-button"
			);
			expect(component.length).toBe(1);
		});

		it("not available renders ratings", () => {
			const wrapper = setup({ orders: singleBookOrder });
			expect(wrapper.find(RatingComponent).exists()).toBe(
				true
			);
		});
	});

	it("should render all the available orders", async () => {
		const wrapper = setup({
			orders: multipleOrders,
		});
		const component = await findByTestAttr(
			wrapper,
			"order-item-component"
		);
		expect(component.length).toBe(multipleOrders.length);
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(ParentOrders, defaultProps);
	});

	it("should match the snapshot", () => {
		const wrapper = setup({
			orders: multipleOrders,
		});
		expect(wrapper).toMatchSnapshot();
	});
});
