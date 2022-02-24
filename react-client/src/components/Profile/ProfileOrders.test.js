import React from "react";
import { mount, shallow } from "enzyme";
import {
	checkProp,
	findByTestAttr,
} from "../../tests/testUtils";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import { setUser } from "../../store/slices/userSlice";
import RatingService from "../../service/RatingService";
import Profileorders from "./ProfileOrders";

let store;
const setup = (store, props = {}) => {
	return mount(
		<Provider store={store}>
			<Profileorders />
		</Provider>
	);
};

describe("Ratings component test casses", () => {
	beforeEach(() => {
		store = createTestStore();
	});

	it("renders without any error", async () => {
		const wrapper = setup(store);
		const component = await findByTestAttr(
			wrapper,
			"component-profile-order"
		);
		expect(component.length).toBe(1);
	});
});
