import { getLetterMatchCount } from "./";

describe("getLetterMatchCount returns correct count", () => {
	const secretWord = "party";

	it("when no matching letters", () => {
		expect(getLetterMatchCount("bones", secretWord)).toBe(
			0
		);
	});
	it("when 3 matching letters", () => {
		expect(getLetterMatchCount("parzc", secretWord)).toBe(
			3
		);
	});
	it("when dublicate matching letters", () => {
		expect(getLetterMatchCount("paac", secretWord)).toBe(2);
	});
});
