import React from "react";
import { mount, shallow } from "enzyme";
import Sidebar from "./";
import { findByTestAttr } from "../../tests/testUtils";

const setup = (props = {}) => {
	return mount(<Sidebar />);
};

describe("Testing side nav component", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		// const component = await findByTestAttr(
		// 	wrapper,
		// 	"component-side-bar"
		// );
		// expect(component.length).toBe(1);
	});
	// it("should have default all books item", async () => {
	// 	const wrapper = setup();

	// 	console.log(wrapper);
	// 	// expect(component.length).toBe(1);
	// });
	// it("should display all the categories", () => {});
});
