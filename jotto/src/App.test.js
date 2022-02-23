import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "./tests/testUtils";
import App from "./App";

const setup = () => {
	return shallow(<App />);
};

it("app.js renders without any error", async () => {
	const wrapper = setup();
	const component = await findByTestAttr(
		wrapper,
		"component-app"
	);
	expect(component.exists()).toBeTruthy();
});
