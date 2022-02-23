export const findByTestAttr = (wrapper, value) => {
	return wrapper.find(`[data-test='${value}']`);
};
