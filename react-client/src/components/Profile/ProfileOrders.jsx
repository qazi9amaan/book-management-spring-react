import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderService from "../../service/OrderService";
import {
	AiOutlineArrowLeft,
	AiFillFastForward,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import RatingComponent from "../Ratings";

const Profileorders = () => {
	const user = useSelector((state) => state.user.user);

	const [orders, setOrders] = useState([]);
	const [childView, setchildView] = useState(false);
	const [childBooks, setChildBooks] = useState([]);

	useEffect(() => {
		OrderService.getAllOrdersFor(user.cid).then((res) => {
			console.log(res.data);
			setOrders(res.data);
		});
	}, []);

	return !childView ? (
		<ParentOrders
			orders={orders}
			setchildView={setchildView}
			setChildBooks={setChildBooks}
		/>
	) : (
		<ChildOrders
			setchildView={setchildView}
			orders={childBooks}
		/>
	);
};

const ParentOrders = ({
	orders,
	setchildView,
	setChildBooks,
}) => {
	const getBookName = (books) => {
		return books.length == 1
			? books[0].title
			: `${books[0].title} + ${books.length} more `;
	};

	const viewAllClickHandler = (order) => {
		setChildBooks(order);
		setchildView(true);
	};
	return (
		<div className=" container ">
			<div
				className="overflow-scroll px-3"
				style={{ height: "80vh" }}>
				{orders.map((order, index) => (
					<div className="product">
						<div className="book ">
							<img src={order.books[0].cover} />
							<div>
								<p
									className={`m-0  p-0 status ${
										order.status == "Cancelled"
											? "text-danger"
											: ""
									}`}>
									{order.statusMsg}
								</p>
								<h3 className="m-0 p-0">
									{getBookName(order.books)}
								</h3>
								<p className="author"> ₹{order.price}</p>
								<small className="text-muted">
									{order.orderDate}
								</small>
							</div>
						</div>
						{order.books.length == 1 ? (
							<div className="ratings">
								<RatingComponent book={order.books[0]} />
							</div>
						) : (
							<div className="other">
								<button
									onClick={() => viewAllClickHandler(order)}
									className=" badge alert-warning p-2  px-3 btn btn-warning rounded-pill badge-pill">
									view {order.books.length} other books
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

const ChildOrders = ({ orders, setchildView }) => {
	const getBookName = (books) => {
		return books.length == 1
			? books[0].title
			: `${books[0].title} + ${books.length} more `;
	};
	return (
		<div className=" container ">
			<div
				className="overflow-scroll px-3"
				style={{ height: "80vh" }}>
				<h3 className="mb-4">
					<AiOutlineArrowLeft
						className="me-3 fs-2 hover"
						onClick={() => setchildView(false)}
					/>
					{orders.books.length} more
				</h3>
				{orders.books.map((book, index) => (
					<div className="product">
						<div className="book ">
							<img src={book.cover} />
							<div>
								<p
									className={`m-0  p-0 status ${
										orders.status == "Cancelled"
											? "text-danger"
											: ""
									}`}>
									{orders.statusMsg}
								</p>
								<h3 className="m-0 p-0">{book.title}</h3>
								<p className="author"> ₹{book.price}</p>
								<small className="text-muted">
									{orders.orderDate}
								</small>
							</div>
						</div>
						<div className="ratings">
							<RatingComponent book={book} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Profileorders;
