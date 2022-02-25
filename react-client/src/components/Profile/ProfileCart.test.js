import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import Profilecart from "./ProfileCart";
import { BrowserRouter } from "react-router-dom";

const store = createTestStore();
const setup = () => {
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<Profilecart />
			</Provider>
		</BrowserRouter>
	);
};

it("should render without any errors", async () => {
	const wrapper = setup();
	const component = await findByTestAttr(
		wrapper,
		"component-profilecart"
	);
	expect(component.length).toBe(1);
});
it("should render `Please add some books` when nothing is there", () => {});
it("should render `check out button` when books are there", () => {});
it("placeorder should dispatch event in store", () => {});
