import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import Profileorders from "./ProfileOrders";
import OrderService from "../../service/OrderService";
import AddressService from "../../service/AddressService";
import { setUser } from "../../store/slices/userSlice";

const store = createTestStore();
const setup = () => {
	return mount(
		<Provider store={store}>
			<Profileorders />
		</Provider>
	);
};

describe("Profile orders component test casses", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-profile-order"
		);
		expect(component.length).toBe(1);
	});

	it("by default `childView` is false", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-profile-order-parent"
		);
		expect(component.length).toBe(1);
	});

	// describe("when `childview is`", () => {
	// 	it("false, render parent component", async () => {
	// 		const wrapper = setup();
	// 		const component = await findByTestAttr(
	// 			wrapper,
	// 			"component-profile-order-parent"
	// 		);
	// 		expect(component.length).toBe(1);
	// 	});
	// 	it("true, render child component", async () => {
	// 		const childView = true;
	// 		reactModule.useState = jest.fn(
	// 			(initialLoadingValue) => [childView, () => {}]
	// 		);
	// 		const wrapper = setup();

	// 		const component = await findByTestAttr(
	// 			wrapper,
	// 			"component-profile-order-child"
	// 		);
	// 		expect(component.length).toBe(1);
	// 	});
	// });

	it("calls the `getAllOrdersFor` method", async () => {
		try {
			store.dispatch(setUser({ cid: 25 }));
			jest
				.spyOn(React, "useEffect")
				.mockImplementation((f) => f());
			jest.spyOn(OrderService, "getAllOrdersFor");
			setup();
			await expect(
				OrderService.getAllOrdersFor
			).toHaveBeenCalledTimes(1);
		} catch (err) {}
	});
});
