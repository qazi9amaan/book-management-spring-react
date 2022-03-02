import React from "react";
import { mount } from "enzyme";
import {
	checkProp,
	findByTestAttr,
} from "../../tests/testUtils";
import BookDetails from ".";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import { BrowserRouter } from "react-router-dom";
import {
	addBook,
	addBooktoCart,
} from "../../store/slices/userSlice";

const defaultProps = {
	book: {
		ratings: [],
	},
};

const dispatcherFunction = jest.fn();
const store = createTestStore();
store.dispatch = dispatcherFunction;

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

	it("should dispatch `addToCart` on click", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"book-addToCart"
		);
		component.simulate("click");
		expect(dispatcherFunction).toHaveBeenCalledWith({
			type: addBooktoCart.type,
			payload: defaultProps.book,
		});
	});

	it("should dispatch `buyBook` on click", async () => {
		const wrapper = setup();
		const component = await findByTestAttr(
			wrapper,
			"book-buyBook"
		);
		component.simulate("click");
		expect(dispatcherFunction).toHaveBeenCalledWith({
			type: addBook.type,
			payload: defaultProps.book,
		});
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(BookDetails, defaultProps);
	});

	it("should match the default snapshot", () => {
		const wrapper = setup();
		expect(wrapper).toMatchSnapshot();
	});
});
