import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import Profileorders from "./ProfileOrders";
import OrderService from "../../service/OrderService";
import { setUser } from "../../store/slices/userSlice";
import moxios from "moxios";
import { DummyData } from "../../tests/dummyData";
import ParentOrders from "./ProfileOrders/ParentOrders";
import ChildOrders from "./ProfileOrders/ChildOrders";

const defaultState = {
	orders: [],
	childView: false,
	childOrders: null,
	isLoading: true,
	error: null,
};

const store = createTestStore();
const setup = () => {
	return mount(
		<Provider store={store}>
			<Profileorders />
		</Provider>
	);
};

describe("Profile orders component test casses", () => {
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
			"component-profile-order"
		);
		expect(component.length).toBe(1);
	});

	describe("when `getAllOrdersFor()` is called", () => {
		it("return the correct repsonse", async () => {
			await moxios.wait(() => {
				const req = moxios.requests.mostRecent();
				req.respondWith({
					status: 200,
					response: "yes",
				});
			});
			return OrderService.getAllOrdersFor().then(
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

			return OrderService.getAllOrdersFor().catch(
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
			jest.spyOn(OrderService, "getAllOrdersFor");
			setup();
			expect(
				OrderService.getAllOrdersFor
			).toHaveBeenCalledTimes(1);
		});

		// test loading state
		describe("while loading", () => {
			let wrapper;
			beforeEach(() => {
				const initalValue = {
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
					...defaultState,
					orders: DummyData.singleBookOrder,
					isLoading: false,
				};

				React.useState = jest.fn(() => [
					initalValue,
					jest.fn(),
				]);

				wrapper = setup();
			});
			it("should render items", async () => {
				expect(wrapper.find(ParentOrders).length).toBe(1);
			});

			it("should match the success snapshot", () => {
				expect(wrapper).toMatchSnapshot();
			});
		});
	});

	describe("when `childview is`", () => {
		it("false, render parent component", async () => {
			const initalValue = {
				...defaultState,
				orders: DummyData.singleBookOrder,
				isLoading: false,
			};

			React.useState = jest.fn(() => [
				initalValue,
				jest.fn(),
			]);

			const wrapper = setup();
			const component = await findByTestAttr(
				wrapper,
				"component-profile-order-parent"
			);
			expect(component.length).toBe(1);
		});
		it("true, render child component", async () => {
			const initalValue = {
				...defaultState,
				orders: DummyData.singleBookOrder,
				isLoading: false,
				childOrders: DummyData.childOrdes,
				childView: true,
			};

			React.useState = jest.fn(() => [
				initalValue,
				jest.fn(),
			]);

			const wrapper = setup();
			expect(wrapper.find(ChildOrders).length).toBe(1);
		});
	});
});
