import React from "react";
import { mount, shallow } from "enzyme";
import Sidebar from "./";
import { findByTestAttr } from "../../tests/testUtils";
import { BrowserRouter } from "react-router-dom";
import moxios from "moxios";
import CategoryService from "../../service/CategoryService";

const setup = (props = {}) => {
	return mount(
		<BrowserRouter>
			<Sidebar />
		</BrowserRouter>
	);
};

describe("Testing side nav component", () => {
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
			"component-side-bar"
		);
		expect(component.length).toBe(1);
	});
	it("should have default `all books`", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-side-bar-item"
		);
		expect(component.length).toBe(1);
	});

	describe("when `getAllCategories()` request is made", () => {
		beforeEach(async () => {
			await moxios.wait(() => {
				const req = moxios.requests.mostRecent();
				req.respondWith({
					status: 200,
					response: [{ name: "Romance", id: 1 }],
				});
			});
		});

		it("should return the correct repsonse", async () => {
			return CategoryService.getAllCategories().then(
				(respsonse) => {
					expect(respsonse.data).toEqual([
						{ name: "Romance", id: 1 },
					]);
				}
			);
		});
	});

	it("should call the api once it renders", async () => {
		jest
			.spyOn(React, "useEffect")
			.mockImplementation((f) => f());
		jest.spyOn(CategoryService, "getAllCategories");
		setup();
		expect(
			CategoryService.getAllCategories
		).toHaveBeenCalledTimes(1);
	});
});
