import React from "react";
import { mount } from "enzyme";
import Profile from "./";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTestStore } from "../../store";
import { findByTestAttr } from "../../tests/testUtils";
import Navbar from "../../components/Navbar";
import LinkComponent from "./ProfileSideLink/LinkComponent";
const store = createTestStore();

const setup = () => {
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<Profile />
			</Provider>
		</BrowserRouter>
	);
};

describe("Testing books component", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-profile"
		);
		expect(wrapper.find(Navbar).exists()).toBe(true);
	});
	it("renders `Navabar` any error", async () => {
		const wrapper = setup();
		expect(wrapper.find(Navbar).exists()).toBe(true);
	});

	it("renders 4 `LinkComponent` ", async () => {
		const wrapper = setup();
		expect(wrapper.find(LinkComponent).length).toBe(4);
	});

	it("should match the default snapshot", () => {
		const wrapper = setup();
		expect(wrapper).toMatchSnapshot();
	});
});
