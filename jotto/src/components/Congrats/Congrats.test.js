import React from "react";
import Congrats from "./Congrats";
import { shallow } from "enzyme";

import {
	findByTestAttr,
	checkProp,
} from "../../tests/testUtils";

const defaultProps = { success: false };

const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return shallow(<Congrats {...setUpProps} />);
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

	it("doesnot throw warning with expected props", async () => {
		const expectedProps = { success: true };
		checkProp(Congrats, expectedProps);
	});
});
