import { getLetterMatchCount } from "./";

describe("getLetterMatchCount", () => {
	const secretWord = "party";

	it("return correct count when no matching letters", () => {
		expect(getLetterMatchCount("bones", secretWord)).toBe(
			0
		);
	});
	it("return correct count when 3 matching letters", () => {
		expect(getLetterMatchCount("parzc", secretWord)).toBe(
			3
		);
	});
	it("return correct count when dublicate matching letters", () => {
		expect(getLetterMatchCount("paac", secretWord)).toBe(2);
	});
});
