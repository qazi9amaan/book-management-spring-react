import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import Congrats from "./Congrats";
import { findByTestAttr } from "../../tests/testUtils";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
	return shallow(<Congrats {...props} />);
};

describe("congrats components test cases", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-congrats"
		);
		expect(component.length).toBe(1);
	});

	it("renders no text when `success` prop is false", async () => {
		const wrapper = setup({ success: false });
		const component = await findByTestAttr(
			wrapper,
			"component-congrats"
		);
		expect(component.text()).toEqual("");
	});

	it("renders text msg when `success` prop is true", async () => {
		const wrapper = setup({ success: true });
		const component = await findByTestAttr(
			wrapper,
			"congrats-message"
		);
		expect(component.text().length).not.toBe(0);
	});
});
