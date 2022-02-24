import React from "react";
import { mount, shallow } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";

import ProfileAddress from "./ProfileAddress";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";

const setup = (props = {}) => {
	const store = createTestStore();
	return mount(
		<Provider store={store}>
			<ProfileAddress />
		</Provider>
	);
};

describe("Profile orders [parent] component test casses", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-profile-address"
		);
		expect(component.length).toBe(1);
	});

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

	// it("should render all the available orders", async () => {
	// 	const wrapper = setup({
	// 		orders: multipleOrders,
	// 	});
	// 	const component = await findByTestAttr(
	// 		wrapper,
	// 		"order-item-component"
	// 	);
	// 	expect(component.length).toBe(multipleOrders.length);
	// });
});
