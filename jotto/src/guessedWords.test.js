import React from "react";
import { findByTestAttr } from "./tests/testUtils";

import { mount } from "enzyme";
import App from "./App";

const setup = async (state = {}) => {
	// TODO: apply state
	const wrapper = mount(<App />);

	//inputbox
	const inputBox = await findByTestAttr(
		wrapper,
		"input-box"
	);

	inputBox.simulate("change", {
		target: {
			value: "train",
		},
	});

	//submitbox
	const button = await findByTestAttr(
		wrapper,
		"input-button"
	);
	button.simulate("click", { preventDefault() {} });

	return wrapper;
};

describe("some words guessed", () => {});

describe("secret word guessed", () => {});
