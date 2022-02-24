import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	AiOutlineArrowLeft,
	AiFillFastForward,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import RatingComponent from "../../Ratings";

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

export default ChildOrders;
