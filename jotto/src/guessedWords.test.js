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

describe.skip("no words guessed", () => {
	let wrapper;
	beforeEach(async () => {
		wrapper = await setup({
			secret: "party",
			success: false,
			guesses: [],
		});
	});

	it("creates guess word table with 1 row", async () => {
		const guesses = await findByTestAttr(
			wrapper,
			"guess-child"
		);
		expect(guesses).toHaveLength(1);
	});
});

describe.skip("some words guessed", () => {
	let wrapper;
	beforeEach(async () => {
		wrapper = await setup({
			secret: "party",
			success: false,
			guesses: [
				{ guessedWord: "agile", letterMatchCount: 1 },
			],
		});
	});

	it("adds 1 row to the table", async () => {
		const guesses = await findByTestAttr(
			wrapper,
			"guess-child"
		);
		expect(guesses).toHaveLength(2);
	});
});

describe.skip("secret word guessed", () => {
	let wrapper;
	beforeEach(async () => {
		wrapper = await setup({
			secret: "party",
			success: true,
			guesses: [
				{ guessedWord: "agile", letterMatchCount: 1 },
				{ guessedWord: "party", letterMatchCount: 4 },
			],
		});
	});

	it("adds 1 row to the table", async () => {
		const guesses = await findByTestAttr(
			wrapper,
			"guess-child"
		);
		expect(guesses).toHaveLength(2);
	});

	it("displays congrats component", async () => {
		const guesses = await findByTestAttr(
			wrapper,
			"component-congrats"
		);
		expect(guesses).toBeGreaterThan(0);
	});

	it("hides the input component", async () => {
		const inputBox = await findByTestAttr(
			wrapper,
			"input-box"
		);
		expect(inputBox.exists()).toBeFalsy();
	});
});
