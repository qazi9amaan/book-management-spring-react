import React from "react";
import { mount } from "enzyme";

import ProfileAddress from "./ProfileAddress";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import AddressService from "../../service/AddressService";
import AddressItem from "./AddressItem/AddressItem";
import { setUser } from "../../store/slices/userSlice";
import { act } from "react-dom/test-utils";

const store = createTestStore();
const setup = (props = {}) => {
	return mount(
		<Provider store={store}>
			<ProfileAddress />
		</Provider>
	);
};

it("should render 0 when nothing", async () => {
	let wrapper;
	act(() => {
		store.dispatch(setUser({ cid: 25 }));
		wrapper = setup();
	});
	const component = await wrapper.find(AddressItem);
	expect(component.length).toBe(0);
});

it("calls the `getAddressByUser` method", () => {
	act(() => {
		jest
			.spyOn(React, "useEffect")
			.mockImplementation((f) => f());
		jest.spyOn(AddressService, "getAddressByUser");
		store.dispatch(setUser({ cid: 25 }));
		setup();
	});
	expect(
		AddressService.getAddressByUser
	).toHaveBeenCalledTimes(1);
});
