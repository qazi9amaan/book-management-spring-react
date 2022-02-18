import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import OrderService from "../../../../service/OrderService";
import { clearOrderDetails } from "../../../../store/slices/userSlice";

function PaymentStep() {
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

	const getBookIds = (books) => {
		let ids = [];
		books.forEach((book) => {
			ids.push(book.bid);
		});
		return ids;
	};

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

		setTimeout(() => {
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
		}, 1300);
	};

	return (
		<div class="container pt-5 mt-3">
			<div class="row align-items-center gx-5">
				<div class="col px-5">
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
					<div class="items"></div>
					<h5 className="mt-4">Items</h5>
					<div
						style={{ maxHeight: "25rem" }}
						className=" overflow-scroll">
						{userState.books.map((book) => (
							<ItemChild book={book} />
						))}
					</div>{" "}
				</div>

				<div class="col px-5">
					<div
						style={{ borderRadius: "1rem" }}
						class="card shadow-lg border-0 ">
						<div class="card-body px-5 mt-3">
							<h3 class="card-title fs-2">Checkout</h3>

							<ul class="list-group px-1 list-group-flush">
								{userState.books.map((book) => (
									<li class=" border-bottom py-2 fs-6 d-flex justify-content-between">
										<span>{book.title}</span>
										<span>₹{book.price}</span>
									</li>
								))}
								<li class="px-2 mt-4 fs-5 py-2 d-flex justify-content-between">
									<h5>Total</h5>
									<h3>₹{getTotalPrice(userState.books)}</h3>
								</li>
							</ul>
							<button
								style={{ borderRadius: "1rem" }}
								disabled={btn.disabled}
								onClick={placeOrder}
								class="btn w-100 mt-3  mb-3 py-3  btn-dark">
								{btn.text}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function ItemChild({ book }) {
	return (
		<div class="d-flex justify-content-between align-items-center mt-3 pb-2 p-4 border rounded-3">
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
	);
}
export default PaymentStep;
