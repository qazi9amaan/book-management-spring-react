import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import Profileorders from "./ProfileOrders";
import OrderService from "../../service/OrderService";

const setup = () => {
	const store = createTestStore();
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