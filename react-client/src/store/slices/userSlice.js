import { createSlice } from "@reduxjs/toolkit";

const inituser = JSON.parse(localStorage.getItem("user"));
const user = inituser || {
	cid: "",
	fullName: "",
	phoneNumber: "",
};
const initialState = {
	auth: localStorage.getItem("auth") || false,
	user: user,
	address: {
		aid: "",
		customerName: "",
		phoneNumber: "",
		address: "",
		mstate: "",
		pincode: "",
		customerId: "",
	},
	books: [],
	cart: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		changeAuth: (state) => {
			state.auth = true;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setAddress(state, action) {
			state.address = action.payload;
		},
		addBook(state, action) {
			state.books = [];
			state.books.push(action.payload);
		},
		addBooktoCart(state, action) {
			state.cart.push(action.payload);
		},
		addtoBuy(state) {
			const cart = state.cart;
			state.books = cart;
			state.cart = [];
		},
		clearOrderDetails(state) {
			state.books = [];
			state.address = {};
		},
		removeBook(state, action) {
			state.cart.splice(action.payload, 1);
		},
		clearAuth(state) {
			state.auth = false;
			state.user = {
				cid: "",
				fullName: "",
				phoneNumber: "",
			};
		},
	},
});

export const {
	changeAuth,
	setUser,
	setAddress,
	addBook,
	clearOrderDetails,
	removeBook,
	addBooktoCart,
	addtoBuy,
	clearAuth,
} = userSlice.actions;

export default userSlice.reducer;
