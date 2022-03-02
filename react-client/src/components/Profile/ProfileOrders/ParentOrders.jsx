import React from "react";
import RatingComponent from "../../Ratings";
import PropTypes from "prop-types";

const ParentOrders = ({ orders, setChildBooks }) => {
	const getBookName = (books) => {
		return books.length == 1
			? books[0].title
			: `${books[0].title} + ${books.length} more `;
	};

	const viewAllClickHandler = (order) => {
		console.log("setting orders child");
		console.log(order);
		setChildBooks(order);
	};
	return (
		<div
			data-test="component-profile-order-parent"
			className=" container ">
			<div
				className="overflow-scroll px-3"
				style={{ height: "80vh" }}>
				{orders.map((order, index) => (
					<div
						data-test="order-item-component"
						key={index}
						className="product">
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
									data-test="show-more-books-button"
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

ParentOrders.propType = {
	orders: PropTypes.array.isRequired,
	setChildBooks: PropTypes.func.isRequired,
};
export default ParentOrders;
