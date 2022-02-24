module.exports = {
	...jest.requireActual(".."),
	_esModule: true,
	getSecretWord: jest
		.fn()
		.mockReturnValue(Promise.resolve("party")),
};
