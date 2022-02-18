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

const Profilecart = () => {
	const navigate = useNavigate();
	const userState = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [btn, setBtn] = useState({
		disabled: false,
		text: "Place Order",
	});

	const getTotalPrice = (books) => {
		let total = 0;
		books.forEach((book) => {
			total += book.price;
		});
		return total;
	};

	const placeOrder = () => {
		dispatch(addtoBuy());
		navigate("/checkout");
	};

	return (
		<div>
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
						<ItemChild book={book} />
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

function ItemChild({ book }) {
	const dispatch = useDispatch();

	const removeCart = (book) => {
		dispatch(removeBook(book));
	};
	return (
		<div className="d-flex justify-content-between align-items-center">
			<div class="d-flex justify-content-between align-items-center mb-2 pb-2 p-4 border-bottom ">
				<div
					style={{
						width: "60%",
					}}
					className="d-flex">
					<img
						src={book.cover}
						style={{ height: "4.6rem" }}
					/>
					<div className="ms-2">
						<h6 className="pb-0 mb-0">{book.title}</h6>
						<p
							style={{
								maxLines: "1",
							}}>
							<small>
								{book.description.substring(0, 100)}
							</small>
						</p>
					</div>
				</div>
				<h4>1</h4>
				<h4>₹{book.price}</h4>
			</div>
			<MdOutlineRemoveCircleOutline
				onClick={() => {
					removeCart(book);
				}}
				style={{
					fontSize: "2.6rem",
					opacity: 0.7,
					cursor: "pointer",
				}}
			/>
		</div>
	);
}

export default Profilecart;
