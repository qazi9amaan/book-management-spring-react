import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTestStore } from "../../../../store";
import AddAddress from "./AddAddress";
const store = createTestStore();

const setup = () => {
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<AddAddress />
			</Provider>
		</BrowserRouter>
	);
};

describe("testing add address", () => {
	it("renders without any error", () => {
		const wrapper = setup();
		expect(wrapper.find("AddAddress").length).toBe(1);
	});

	it("renders the correct snapshot", () => {
		const wrapper = setup();
		expect(wrapper).toMatchSnapshot();
	});
});
