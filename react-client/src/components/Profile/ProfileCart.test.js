import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import Profilecart from "./ProfileCart";
import { BrowserRouter } from "react-router-dom";
import { addBooktoCart } from "../../store/slices/userSlice";

const storeState = {
	book: {
		bid: 21,
		title: "",
		price: "",
		description: "",
		cover: "",
	},
};

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

it("should render `Please add some books` when nothing is there", async () => {
	const wrapper = setup();
	const component = await findByTestAttr(
		wrapper,
		"render-pace"
	);
	expect(component.text()).toBe(
		"Please add some books ...."
	);
});

it("should render `check out button` when books are there", async () => {
	store.dispatch(addBooktoCart(storeState.book));
	const wrapper = setup();
	const component = await findByTestAttr(
		wrapper,
		"checkout-btn"
	);
	expect(component.length).toBe(1);
});
it("placeorder should dispatch event in store", async () => {
	const dispatchFunction = jest.fn();
	store.dispatch = dispatchFunction;

	const wrapper = setup();
	const component = await findByTestAttr(
		wrapper,
		"checkout-btn"
	);
	component.simulate("click");
	expect(dispatchFunction).toHaveBeenCalled();
});
