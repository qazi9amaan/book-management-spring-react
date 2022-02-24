import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import OrderService from "../../service/OrderService";
import { setUser } from "../../store/slices/userSlice";
import Profileaddress from "./ProfileAddress";
import AddressService from "../../service/AddressService";
import { act } from "react-dom/test-utils";
import moxios from "moxios";
import AddressItem from "./AddressItem/AddressItem";

const store = createTestStore();
const setup = () => {
	return mount(
		<Provider store={store}>
			<Profileaddress />
		</Provider>
	);
};

describe("Profile address component test casses", () => {
	beforeEach(() => {
		moxios.install();
	});
	afterEach(() => {
		moxios.uninstall();
	});

	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-profile-address"
		);
		expect(component.length).toBe(1);
	});

	describe("when the api returns", () => {
		it("nothing, should render nothing", async () => {
			await moxios.wait(() => {
				const req = moxios.requests.mostRecent();
				req.respondWith({
					status: 200,
					response: [],
				});
			});
			const wrapper = setup();
			await expect(wrapper.find(AddressItem).exists()).toBe(
				false
			);
		});
	});

	it("calls the `getAddressByUser` method", async () => {
		await moxios.wait(() => {
			const req = moxios.requests.mostRecent();
			req.respondWith({
				status: 200,
				response: "yes",
			});
		});
		store.dispatch(setUser({ cid: 25 }));
		jest
			.spyOn(React, "useEffect")
			.mockImplementation((f) => f());
		jest.spyOn(AddressService, "getAddressByUser");
		const wrapper = setup();
		await expect(
			AddressService.getAddressByUser
		).toHaveBeenCalledTimes(1);
	});
});
