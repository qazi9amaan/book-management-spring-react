import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";
import moxios from "moxios";
import CategoryService from "../../service/CategoryService";
import SidebarItem from "./SidebarItem";
import Sidebar from ".";

const setup = () => {
	return shallow(<Sidebar />);
};

describe("Testing side nav component", () => {
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
			"component-side-bar"
		);
		expect(component.length).toBe(1);
	});

	describe("when `getAllCategories()` is called", () => {
		it("return the correct repsonse", async () => {
			await moxios.wait(() => {
				const req = moxios.requests.mostRecent();
				req.respondWith({
					status: 200,
					response: [{ name: "Romance", id: 1 }],
				});
			});
			return CategoryService.getAllCategories().then(
				(respsonse) => {
					expect(respsonse.data).toEqual([
						{ name: "Romance", id: 1 },
					]);
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

			return CategoryService.getAllCategories().catch(
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
			jest.spyOn(CategoryService, "getAllCategories");
			setup();
			expect(
				CategoryService.getAllCategories
			).toHaveBeenCalledTimes(1);
		});

		// test loading state
		describe("while loading", () => {
			let wrapper;
			beforeEach(() => {
				const initalValue = {
					categories: [],
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
					categories: [],
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
					categories: [
						{
							name: "Romance",
							id: 1,
						},
					],
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
				expect(wrapper.find(SidebarItem).length).toBe(2);
			});

			it("should match the success snapshot", () => {
				expect(wrapper).toMatchSnapshot();
			});
		});
	});
});

//changes for this test
//TODO:change the filenames --done
//TODO: beforeAll and afterAll for moxios --done
//TODO: api call error catch --done
//TODO:Shift all data to another file for readibility --done
//TODO:snapshot testing for ui --done
//TODO:complete the incomplete tests --done
