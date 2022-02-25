import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTestStore } from "../../../../store";
import PaymentStep, { getBookIds, getTotalPrice } from "./";
import { addBook } from "../../../../store/slices/userSlice";
import ItemChild from "./PaymentItem";
import OrderService from "../../../../service/OrderService";
const store = createTestStore();

const setup = () => {
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<PaymentStep />
			</Provider>
		</BrowserRouter>
	);
};

it("renders without any error", () => {
	const wrapper = setup();
	expect(wrapper.find("PaymentStep").length).toBe(1);
});

it("renders `ItemChild` multiple times", () => {
	store.dispatch(
		addBook({
			bid: 2,
			title: "Book 2",
			price: 211,
			description: "dsaasdasd 1",
			cover: "https://via.adsasdad.com/150",
		})
	);
	const wrapper = setup();
	expect(wrapper.find(ItemChild).length).toBe(1);
});

it("`getBookIds` renders correct number book ids", () => {
	const books = [
		{
			bid: 1,
			title: "Book 1",
		},
		{
			bid: 2,
			title: "Book 2",
		},
	];
	expect(getBookIds(books)).toEqual([1, 2]);
});

it("`getTotalPrice` renders correct number book ids", () => {
	const books = [
		{
			bid: 1,
			title: "Book 1",
			price: 100,
		},
		{
			bid: 2,
			title: "Book 2",
			price: 200,
		},
	];
	expect(getTotalPrice(books)).toEqual(300);
});
