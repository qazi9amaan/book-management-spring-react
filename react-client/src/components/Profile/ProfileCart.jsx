import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import {
	addtoBuy,
	removeBook,
} from "../../store/slices/userSlice";
import Navbar from "../Navbar";
import { getTotalPrice } from "../../pages/Checkout/Steps/Payment";
import ItemChild from "./CartItem/CartItemChild";

const Profilecart = () => {
	const navigate = useNavigate();
	const userState = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [btn, setBtn] = useState({
		disabled: false,
		text: "Place Order",
	});

	const placeOrder = () => {
		setBtn({
			disabled: true,
			text: "Placing Order",
		});
		dispatch(addtoBuy());
		navigate("/checkout");
	};

	return (
		<div data-test="component-profilecart">
			<Navbar />
			<div className="container w-75 ">
				<div className="p-3 mt-2 ">
					<h3>Cart</h3>
					<p className="w-50">
						Please check out your cart and place your order.
					</p>
				</div>
				<div
					style={{ maxHeight: "21rem" }}
					className=" overflow-scroll">
					{userState.cart.map((book) => (
						<ItemChild book={book} key={book.bid} />
					))}
				</div>
				{userState.cart.length > 0 ? (
					<div>
						<div className="p-3 d-flex justify-content-between  border-bottom mt-3">
							<h3 className="fx-4 text">Total</h3>
							<h3
								style={{ opacity: 0.7 }}
								className="fx-4 text">
								₹{getTotalPrice(userState.cart)}
							</h3>
						</div>
						<div className=" d-flex  mt-3 justify-content-between ">
							<div className="p-2"></div>
							<button
								className="btn btn-success btn-lg rounded-3"
								onClick={() => {
									placeOrder();
								}}
								disabled={btn.disabled}>
								Check out
							</button>
						</div>
					</div>
				) : (
					<h3 className="p-3">
						Please add some books ....
					</h3>
				)}
			</div>
		</div>
	);
};

export default Profilecart;
