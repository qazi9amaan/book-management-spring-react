import React from "react";
import { shallow } from "enzyme";
import {
	findByTestAttr,
	checkProp,
} from "../../tests/testUtils";
import Input from "./Input";

const mockSetCurrentGuess = jest.fn();
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useState: (i) => [i, mockSetCurrentGuess],
}));

const setup = (success = false, secretWord = "party") => {
	return shallow(
		<Input success={success} secretWord={secretWord} />
	);
};

describe("guess-words components test cases", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"component-input"
		);
		expect(component.length).toBe(1);
	});

	it("doesnot throw any errors with required props", () => {
		checkProp(Input, {
			secretWord: "party",
			success: false,
		});
	});

	describe("state controlled input field", () => {
		beforeEach(() => {
			mockSetCurrentGuess.mockClear();
		});

		it("has a input field", async () => {
			const wrapper = setup();
			const inputBox = await findByTestAttr(
				wrapper,
				"input-box"
			);
			expect(inputBox.length).toBe(1);
		});

		it("state updates with change in value", async () => {
			const wrapper = setup();

			const inputBox = await findByTestAttr(
				wrapper,
				"input-box"
			);

			const mockEvent = {
				target: {
					value: "train",
				},
			};

			inputBox.simulate("change", mockEvent);

			expect(mockSetCurrentGuess).toHaveBeenCalledWith(
				"train"
			);
		});

		it("field cleared upon form submit", async () => {
			const wrapper = setup();
			const button = await findByTestAttr(
				wrapper,
				"input-button"
			);
			button.simulate("click", { preventDefault() {} });
			expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
		});
	});

	describe("render on props", () => {
		describe("when `success` is true", () => {
			let wrapper;

			beforeEach(() => {
				wrapper = setup(true);
			});

			it("renders without any error", async () => {
				const component = await findByTestAttr(
					wrapper,
					"component-input"
				);
				expect(component.exists()).toBeTruthy();
			});

			it("hides the input field", async () => {
				const inputBox = await findByTestAttr(
					wrapper,
					"input-box"
				);
				expect(inputBox.exists()).toBeFalsy();
			});

			it("hides the submit button", async () => {
				const inputBtn = await findByTestAttr(
					wrapper,
					"input-button"
				);
				expect(inputBtn.exists()).toBeFalsy();
			});
		});

		describe("when `success` is false", () => {
			let wrapper;

			beforeEach(() => {
				wrapper = setup(false);
			});

			it("renders without any error", async () => {
				const component = await findByTestAttr(
					wrapper,
					"component-input"
				);
				expect(component.exists()).toBeTruthy();
			});

			it("displays the input field", async () => {
				const inputBox = await findByTestAttr(
					wrapper,
					"input-box"
				);
				expect(inputBox.exists()).toBeTruthy();
			});

			it("displays the submit button", async () => {
				const inputBtn = await findByTestAttr(
					wrapper,
					"input-button"
				);
				expect(inputBtn.exists()).toBeTruthy();
			});
		});
	});
});
