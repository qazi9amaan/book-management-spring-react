import React from "react";
import { mount, shallow } from "enzyme";
import {
	checkProp,
	findByTestAttr,
} from "../../../tests/testUtils";
import AddressItem from "./AddressItem";

const defaultProps = {
	address: {
		aid: 39,
		customerName: "Qazi Amaan",
		phoneNumber: "7889776055",
		pincode: "121211",
		mstate: "",
		address: "sdasdas",
	},
};

const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return shallow(<AddressItem {...setUpProps} />);
};

describe("Address item component test casses", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-address-item"
		);
		expect(component.length).toBe(1);
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(AddressItem, defaultProps);
	});

	it("should match the default snapshot", () => {
		const wrapper = setup();
		expect(wrapper).toMatchSnapshot();
	});
});
