import checkPropTypes from "check-prop-types";

export const findByTestAttr = (wrapper, value) => {
	return wrapper.find(`[data-test='${value}']`);
};

export const checkProp = (component, expectedProps) => {
	const propError = checkPropTypes(
		component.propTypes,
		expectedProps,
		"prop",
		component.name
	);
	expect(propError).toBeUndefined();
};
