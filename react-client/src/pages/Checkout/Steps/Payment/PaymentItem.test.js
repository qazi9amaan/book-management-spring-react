import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {
	checkProp,
	findByTestAttr,
} from "../../../../tests/testUtils";
import ItemChild from "./PaymentItem";
import { createTestStore } from "../../../../store";
const store = createTestStore();

const defaultProps = {
	book: {
		title: "book name",
		description: " This is test order desc",
		cover: "cover img",
	},
};

const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<ItemChild {...setUpProps} />
			</Provider>
		</BrowserRouter>
	);
};

describe("Testing books item component", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-item"
		);
		expect(component.exists()).toBe(true);
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(ItemChild, defaultProps);
	});
});
