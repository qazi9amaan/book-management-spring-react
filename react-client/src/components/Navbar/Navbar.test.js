import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Navbar from ".";
import { createTestStore } from "../../store";
import { addBooktoCart } from "../../store/slices/userSlice";
import { findByTestAttr } from "../../tests/testUtils";

const bookStore = {
	books: [
		{
			bid: 1,
			title: "",
			price: "",
			description: "",
			cover: "",
		},
	],
};

const store = createTestStore();
const setup = () => {
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<Navbar />
			</Provider>
		</BrowserRouter>
	);
};

it("when cart is empty renders nothing", async () => {
	const wrapper = setup();
	const component = await findByTestAttr(
		wrapper,
		"cart-item-count"
	);
	expect(component.length).toBe(0);
});
it("when cart is filled renders count", async () => {
	store.dispatch(addBooktoCart(bookStore.books[0]));
	const wrapper = setup();
	const component = await findByTestAttr(
		wrapper,
		"cart-item-count"
	);
	expect(component.text()).toBe("1");
});
