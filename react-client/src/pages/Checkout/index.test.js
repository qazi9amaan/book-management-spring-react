import { shallow } from "enzyme";
import React from "react";
import { findByTestAttr } from "../../tests/testUtils";
import CheckOutWrapper from "./";

const setup = () => {
	return shallow(<CheckOutWrapper />);
};

describe("testing check out", () => {
	it("should render without any errors", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"check-out-wrapper"
		);
		expect(component.length).toBe(1);
	});

	it("should load the correct snapshot", () => {
		const wrapper = setup();
		expect(wrapper).toMatchSnapshot();
	});

	it("should render AddressStep default", () => {
		const wrapper = setup();
		const component = wrapper.find("AddressStep");
		expect(component.length).toBe(1);
	});

	it("should render PaymentStep on state change", () => {
		React.useState = jest.fn(() => [1, jest.fn()]);
		const wrapper = setup();
		const component = wrapper.find("PaymentStep");
		expect(component.length).toBe(1);
	});
});
