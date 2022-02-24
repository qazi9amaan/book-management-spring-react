import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "./tests/testUtils";
import App from "./App";
import { getSecretWord as mockedgetSecretWord } from "./actions";

jest.mock("./actions");

const setup = () => {
	return mount(<App />);
};

it("app.js renders without any error", async () => {
	const wrapper = setup();
	const component = await findByTestAttr(
		wrapper,
		"component-app"
	);
	expect(component.exists()).toBeTruthy();
});

describe("get secret word", () => {
	beforeEach(() => {
		mockedgetSecretWord.mockClear();
	});

	test("get secret", () => {
		setup();
		expect(mockedgetSecretWord).toBeCalledTimes(1);
	});
	test("does not change on  app update", () => {
		setup();
		mockedgetSecretWord.mockClear();
		expect(mockedgetSecretWord).toBeCalledTimes(0);
	});
});
