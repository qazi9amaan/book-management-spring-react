import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import Profileaddress from "./ProfileAddress";
import AddressService from "../../service/AddressService";
import moxios from "moxios";
import AddressItem from "./AddressItem/AddressItem";
import { DummyData } from "../../tests/dummyData";

const store = createTestStore();
const setup = () => {
	return mount(
		<Provider store={store}>
			<Profileaddress />
		</Provider>
	);
};

describe("Profile address component test casses", () => {
	beforeAll(() => {
		moxios.install();
	});

	afterAll(() => {
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

	describe("when `getAddressByUser()` is called", () => {
		it("return the correct repsonse", async () => {
			await moxios.wait(() => {
				const req = moxios.requests.mostRecent();
				req.respondWith({
					status: 200,
					response: "yes",
				});
			});
			return AddressService.getAddressByUser().then(
				(respsonse) => {
					expect(respsonse.data).toEqual("yes");
				}
			);
		});

		//response error has been tested.
		it("return error response", async () => {
			await moxios.wait(() => {
				const req = moxios.requests.mostRecent();
				const errResp = {
					status: 500,
					response: {
						msg: "The server is unable to respond",
					},
				};
				req.reject(errResp);
			});

			return AddressService.getAddressByUser().catch(
				(error) => {
					// eslint-disable-next-line jest/no-conditional-expect
					expect(error.status).toEqual(500);
				}
			);
		});
	});

	describe("when an api call is made", () => {
		it("should call fn once only", async () => {
			jest
				.spyOn(React, "useEffect")
				.mockImplementationOnce((f) => f());
			jest.spyOn(AddressService, "getAddressByUser");
			setup();
			expect(
				AddressService.getAddressByUser
			).toHaveBeenCalledTimes(1);
		});

		// test loading state
		describe("while loading", () => {
			let wrapper;
			beforeEach(() => {
				const initalValue = {
					addresses: [],
					isLoading: true,
					error: null,
				};

				React.useState = jest.fn(() => [
					initalValue,
					jest.fn(),
				]);
				wrapper = setup();
			});

			it("should render loading", async () => {
				const component = await findByTestAttr(
					wrapper,
					"loading-spinner"
				);
				expect(component.length).toBe(1);
			});

			it("should match the default loading snapshot", () => {
				expect(wrapper).toMatchSnapshot();
			});
		});

		//testing error state
		describe("when request fails", () => {
			let wrapper;
			beforeEach(() => {
				const initalValue = {
					addresses: [],
					isLoading: false,
					error: "An error has occured",
				};

				React.useState = jest.fn(() => [
					initalValue,
					jest.fn(),
				]);

				wrapper = setup();
			});
			it("should render error msg", async () => {
				const wrapper = setup();
				const component = await findByTestAttr(
					wrapper,
					"error-message"
				);
				expect(component.length).toBe(1);
			});

			it("should match the error snapshot", () => {
				expect(wrapper).toMatchSnapshot();
			});
		});

		//testing categories state
		describe("when request is success", () => {
			let wrapper;
			beforeEach(() => {
				const initalValue = {
					addresses: [DummyData.address],
					isLoading: false,
					error: null,
				};

				React.useState = jest.fn(() => [
					initalValue,
					jest.fn(),
				]);

				wrapper = setup();
			});
			it("should render items", async () => {
				expect(wrapper.find(AddressItem).length).toBe(1);
			});

			it("should match the success snapshot", () => {
				expect(wrapper).toMatchSnapshot();
			});
		});
	});
});
