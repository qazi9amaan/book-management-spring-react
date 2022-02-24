import React from "react";
import { mount, shallow } from "enzyme";
import {
	checkProp,
	findByTestAttr,
} from "../../tests/testUtils";
import BookDetails from ".";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import { BrowserRouter } from "react-router-dom";

const defaultProps = {
	book: {
		ratings: [],
	},
};

const store = createTestStore();
const setup = (props = {}) => {
	const setUpProps = { ...defaultProps, ...props };
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<BookDetails {...setUpProps} />
			</Provider>
		</BrowserRouter>
	);
};

describe("Book item component test casses", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"book-details"
		);
		expect(component.length).toBe(1);
	});

	// it("should call `setSelectedBook` on click", async () => {
	// 	const wrapper = setup();
	// 	const component = await findByTestAttr(
	// 		wrapper,
	// 		"book-item"
	// 	);
	// 	component.simulate("click");
	// 	expect(defaultProps.setSelectedBook).toHaveBeenCalled();
	// });

	// it("doesnot throw warning with expected props", async () => {
	// 	checkProp(BookDetails, defaultProps);
	// });
});
