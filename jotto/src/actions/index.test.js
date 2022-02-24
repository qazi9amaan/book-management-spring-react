import moxios from "moxios";
import { getSecretWord } from ".";

describe("getting secret word", () => {
	beforeEach(() => {
		moxios.install();
	});
	afterEach(() => {
		moxios.uninstall();
	});

	it("returns the `secret` word", async () => {
		await moxios.wait(() => {
			const req = moxios.requests.mostRecent();
			req.respondWith({
				status: 200,
				response: "party",
			});
		});

		return getSecretWord().then((secret) => {
			expect(secret).toEqual("party");
		});
	});
});
