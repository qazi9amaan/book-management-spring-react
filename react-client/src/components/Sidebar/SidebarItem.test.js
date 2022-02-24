import React from "react";
import { shallow } from "enzyme";
import SidebarItem from "./SidebarItem";
import {
	findByTestAttr,
	checkProp,
} from "../../tests/testUtils";
import { Link } from "react-router-dom";

const defaultProps = { name: "Horror" };

const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return shallow(<SidebarItem {...setUpProps} />);
};

describe("Testing side nav component", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-side-bar-item"
		);
		expect(component.length).toBe(1);
	});
	describe("should have the correct navigation when", () => {
		it("`url` not passed", async () => {
			const wrapper = setup();
			const component = await findByTestAttr(
				wrapper,
				"component-side-bar-item"
			);
			expect(component.find(Link).prop("to")).toBe(
				`/cat/${defaultProps.name}`
			);
		});
		it("`url`was passed", async () => {
			const wrapper = setup({
				url: "/",
				name: "All Books",
			});
			const component = await findByTestAttr(
				wrapper,
				"component-side-bar-item"
			);
			expect(component.find(Link).prop("to")).toBe("/");
		});
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(SidebarItem, defaultProps);
	});
});
