import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import OrderService from "../../../../service/OrderService";
import { clearOrderDetails } from "../../../../store/slices/userSlice";
import ItemChild from "./PaymentItem";

export const getTotalPrice = (books) => {
	let total = 0;
	books.forEach((book) => {
		total += book.price;
	});
	return total;
};

export const getBookIds = (books) => {
	let ids = [];
	books.forEach((book) => {
		ids.push(book.bid);
	});
	return ids;
};

function PaymentStep() {
	const navigate = useNavigate();
	const userState = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [btn, setBtn] = useState({
		disabled: false,
		text: "Place Order",
	});

	const placeOrder = () => {
		const date = new Date().toLocaleString();
		const order = {
			tracking: "sdsasdasdd",
			status: "waiting",
			statusMsg: "waiting for approval",
			orderDate: date + "",
			price: getTotalPrice(userState.books),
			customerId: userState.user.cid,
			addressId: userState.address.aid,
			bookId: getBookIds(userState.books),
		};
		setBtn({
			disabled: true,
			text: "Please wait...",
		});

		OrderService.placeOrder(order)
			.then((res) => {
				setBtn({
					disabled: false,
					text: "Place Order",
				});
				dispatch(clearOrderDetails());
				navigate("/profile");
			})
			.catch((err) => {
				console.log(err);
				setBtn({
					disabled: false,
					text: "Try again!",
				});
			});
	};

	return (
		<div
			dat-test="component-payment"
			className="container pt-5 mt-3">
			<div className="row align-items-center gx-5">
				<div className="col px-5">
					<div>
						<div>
							<BiArrowBack
								style={{ cursor: " pointer" }}
								className="fs-2 mb-3 "
								onClick={() => {
									window.history.back();
								}}
							/>
							<h3>Shipping Address</h3>
							<h5 className="mt-4">
								{userState.address.customerName}
							</h5>

							<p className="text-secondary">
								{userState.address.phoneNumber}
								<br />
								{userState.address.address}{" "}
								{userState.address.mstate} -{" "}
								{userState.address.pincode}
							</p>
						</div>
					</div>
					<div className="items"></div>
					<h5 className="mt-4">Items</h5>
					<div
						style={{ maxHeight: "25rem" }}
						className=" overflow-scroll">
						{userState.books.map((book) => (
							<ItemChild key={book.bid} book={book} />
						))}
					</div>
				</div>

				<div className="col px-5">
					<div
						style={{ borderRadius: "1rem" }}
						className="card shadow-lg border-0 ">
						<div className="card-body px-5 mt-3">
							<h3 className="card-title fs-2">Checkout</h3>

							<ul className="list-group px-1 list-group-flush">
								{userState.books.map((book) => (
									<li
										key={book.bid}
										className=" border-bottom py-2 fs-6 d-flex justify-content-between">
										<span>{book.title}</span>
										<span>₹{book.price}</span>
									</li>
								))}
								<li className="px-2 mt-4 fs-5 py-2 d-flex justify-content-between">
									<h5>Total</h5>
									<h3>₹{getTotalPrice(userState.books)}</h3>
								</li>
							</ul>
							<button
								style={{ borderRadius: "1rem" }}
								disabled={btn.disabled}
								onClick={placeOrder}
								className="btn w-100 mt-3  mb-3 py-3  btn-dark">
								{btn.text}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PaymentStep;
