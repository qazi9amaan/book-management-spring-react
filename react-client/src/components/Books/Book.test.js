import React from "react";
import { mount, shallow } from "enzyme";
import Sidebar from "./";
import moxios from "moxios";
import Books from "./";
import { findByTestAttr } from "../../tests/testUtils";

const setup = (props = {}) => {
	return shallow(<Books />);
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
			"component-books"
		);
		expect(component.length).toBe(1);
	});
});
