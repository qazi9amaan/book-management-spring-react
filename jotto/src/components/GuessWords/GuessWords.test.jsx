import React from "react";
import { shallow } from "enzyme";
import {
	findByTestAttr,
	checkProp,
} from "../../tests/testUtils";
import GuessWords from "./GuessWords";

const defaultProps = {
	guesses: [
		{
			guessedWord: "train",
			letterMatchCount: 3,
		},
	],
};

const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return shallow(<GuessWords {...setUpProps} />);
};

describe("guess-words components test cases", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-guess-words"
		);
		expect(component.length).toBe(1);
	});

	describe("it there are no words guessed yet", () => {
		let wrapper;
		beforeEach(() => {
			wrapper = setup({ guesses: [] });
		});

		it("renders without any error", async () => {
			const component = await findByTestAttr(
				wrapper,
				"component-guess-words"
			);
			expect(component.length).toBe(1);
		});

		it("renders instructions", async () => {
			const instructions = await findByTestAttr(
				wrapper,
				"guess-instructions"
			);
			expect(instructions.text().length).not.toBe(0);
		});
	});

	describe("it there are  words guessed", () => {
		let wrapper;
		beforeEach(() => {
			wrapper = setup(defaultProps);
		});

		it("renders without any error", async () => {
			const component = await findByTestAttr(
				wrapper,
				"component-guess-words"
			);
			expect(component.length).toBe(1);
		});

		it("renders `guessed words` section", async () => {
			const guessTable = await findByTestAttr(
				wrapper,
				"guess-table"
			);
			expect(guessTable.length).toBe(1);
		});

		it("renders correct number of guessed words", async () => {
			const guesses = await findByTestAttr(
				wrapper,
				"guess-child"
			);
			expect(guesses).toHaveLength(
				defaultProps.guesses.length
			);
		});
	});

	it("doesnot throw any errors with required props", () => {
		checkProp(GuessWords, defaultProps);
	});
});
