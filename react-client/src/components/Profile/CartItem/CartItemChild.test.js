import React from "react";
import { mount, shallow } from "enzyme";
import {
	checkProp,
	findByTestAttr,
} from "../../../tests/testUtils";
import ItemChild from "./CartItemChild";
import { Provider } from "react-redux";
import { createTestStore } from "../../../store";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { addBooktoCart } from "../../../store/slices/userSlice";

const defaultProps = {
	book: {
		bid: 1,
		title: "",
		price: "",
		description: "",
		cover: "",
	},
};

const store = createTestStore();
const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return mount(
		<Provider store={store}>
			<ItemChild {...setUpProps} />
		</Provider>
	);
};

describe("Address item component test casses", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-cart-item"
		);
		expect(component.length).toBe(1);
	});

	it("on click remove item from store", () => {
		store.dispatch(addBooktoCart(defaultProps.book));
		const wrapper = setup();
		const component = wrapper.find(
			MdOutlineRemoveCircleOutline
		);
		component.simulate("click");
		expect(store.getState().user.cart.length).toBe(0);
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(ItemChild, defaultProps);
	});

	it("should match the deafult snapshot", () => {
		const wrapper = setup();
		expect(wrapper).toMatchSnapshot();
	});
});
