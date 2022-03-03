import React from "react";
import { mount, shallow } from "enzyme";
import AuthUser from "./";
import moxios from "moxios";
import { findByTestAttr } from "../../tests/testUtils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTestStore } from "../../store";
import VerificationService from "../../service/VerificationService";
import { setLocation } from "../../store/slices/locationSlice";

const defaultState = {
	stage: "input",
	phoneNumber: null,
	buttonText: "Send an OTP",
	buttonDisabled: false,
	otp: null,
	error: null,
	hash: null,
};

const store = createTestStore();
const setup = () => {
	return mount(
		<Provider store={store}>
			<AuthUser />
		</Provider>
	);
};

describe("testing the authentication", () => {
	beforeAll(() => {
		moxios.install();
		store.dispatch(setLocation({ pathname: "/" }));
	});
	afterAll(() => {
		moxios.uninstall();
	});

	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-auth"
		);
		expect(component.length).toBe(1);
	});
	describe("when `getOtp()` is called", () => {
		it("return the correct repsonse", async () => {
			await moxios.wait(() => {
				const req = moxios.requests.mostRecent();
				req.respondWith({
					status: 200,
					response: "thisisthehash",
				});
			});
			return VerificationService.getOtp("123456").then(
				(respsonse) => {
					expect(respsonse.data).toEqual("thisisthehash");
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

			return VerificationService.getOtp("123456").catch(
				(error) => {
					// eslint-disable-next-line jest/no-conditional-expect
					expect(error.status).toEqual(500);
				}
			);
		});
	});

	it("verifying the inputs should change state", () => {
		const functionCaller = jest.fn();
		React.useState = jest.fn(() => [
			defaultState,
			functionCaller,
		]);
		const wrapper = setup();
		const input = wrapper.find("input");
		input.simulate("change");
		expect(functionCaller).toHaveBeenCalled();
	});

	describe("when send otp button is clicked", () => {
		beforeEach(() => {
			jest.spyOn(VerificationService, "getOtp");
		});

		it("if phone number available call `getOtp`", async () => {
			const state = {
				...defaultState,
				phoneNumber: "1234567890",
			};
			React.useState = jest.fn(() => [state, jest.fn()]);
			const wrapper = setup();
			const button = wrapper.find("button");
			button.simulate("click");
			expect(VerificationService.getOtp).toHaveBeenCalled();
		});
		it("if phone number incorrect don't call `getOtp`", async () => {
			const state = {
				...defaultState,
				phoneNumber: "123456789",
			};
			React.useState = jest.fn(() => [state, jest.fn()]);
			const wrapper = setup();
			const button = wrapper.find("button");
			button.simulate("click");
			expect(
				VerificationService.getOtp
			).not.toHaveBeenCalled();
		});
	});

	describe("when verify otp button is clicked", () => {
		beforeEach(() => {
			jest.spyOn(VerificationService, "verifyOtp");
		});

		afterEach(() => {
			jest.clearAllMocks();
		});
		describe("if otp & hash available call `verifyOtp`", () => {
			it("should request the api", () => {
				const state = {
					...defaultState,
					stage: "verification",
					otp: "1234",
					phoneNumber: "1234567890",
					hash: "testhash",
				};
				React.useState = jest.fn(() => [state, jest.fn()]);
				const wrapper = setup();

				const button = wrapper.find("button");
				button.simulate("click");
				expect(
					VerificationService.verifyOtp
				).toHaveBeenCalled();
			});
		});

		it("if otp not available dont call `verifyOtp`", async () => {
			const state = {
				...defaultState,
				stage: "verification",
				otp: "",
				phoneNumber: "1234567890",
				hash: null,
			};
			React.useState = jest.fn(() => [state, jest.fn()]);
			const wrapper = setup();

			const button = wrapper.find("button");
			button.simulate("click");
			expect(
				VerificationService.verifyOtp
			).not.toHaveBeenCalled();
		});
	});

	describe("rendering ui components", () => {
		it("should render phone number comp by default", async () => {
			React.useState = jest.fn(() => [
				defaultState,
				jest.fn(),
			]);
			const wrapper = setup();
			const component = await findByTestAttr(
				wrapper,
				"component-phone-number"
			);
			expect(component.length).toBe(1);
		});

		it("should render the correct snapshot by default", () => {
			React.useState = jest.fn(() => [
				defaultState,
				jest.fn(),
			]);
			const wrapper = setup();
			expect(wrapper).toMatchSnapshot();
		});

		it("should render otp comp", async () => {
			React.useState = jest.fn(() => [
				{
					...defaultState,
					stage: "verification",
				},
				jest.fn(),
			]);
			const wrapper = setup();
			const component = await findByTestAttr(
				wrapper,
				"component-phone-number"
			);
			expect(component.length).toBe(0);
		});

		it("should render the correct snapshot of otp", () => {
			React.useState = jest.fn(() => [
				{
					...defaultState,
					stage: "verification",
				},
				jest.fn(),
			]);
			const wrapper = setup();
			expect(wrapper).toMatchSnapshot();
		});
	});
});
