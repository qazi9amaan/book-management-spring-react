import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTestStore } from "../../../store";
import {
	checkProp,
	findByTestAttr,
} from "../../../tests/testUtils";
import LinkComponent from "./LinkComponent";
const store = createTestStore();

const defaultProps = {
	item: {
		title: "Orders",
		url: "/",
		// clickListener: () => {},
	},
};

const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<LinkComponent {...setUpProps} />
			</Provider>
		</BrowserRouter>
	);
};

describe("Testing books item component", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-profile-nav-item"
		);
		expect(component.exists()).toBe(true);
	});

	it("should render link when url passed", () => {
		const wrapper = setup({
			item: {
				title: "Orders",
				url: "/",
			},
		});
		const link = wrapper.find("Link");
		expect(link.exists()).toBe(true);
	});

	it("should not conatain link when url is not passed", () => {
		const wrapper = setup({
			item: {
				title: "Orders",
				clickListener: () => {},
			},
		});
		const link = wrapper.find("Link");
		expect(link.exists()).toBe(false);
	});
	it("should call the clickListener when clicked", async () => {
		const clickListener = jest.fn();
		const wrapper = setup({
			item: {
				title: "Orders",
				clickListener: clickListener,
			},
		});
		const component = await findByTestAttr(
			wrapper,
			"component-profile-nav-item"
		);
		component.simulate("click");
		expect(clickListener).toHaveBeenCalled();
	});

	it("should navigate to url when clicked", async () => {
		const wrapper = setup({
			item: {
				title: "Orders",
				url: "/",
			},
		});
		const component = wrapper.find("Link");
		component.simulate("click");
		expect(window.location.pathname).toBe("/");
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(LinkComponent, defaultProps);
	});
});
