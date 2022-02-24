import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import RatingComponent from "../../Ratings";

const ChildOrders = ({ orders, setchildView }) => {
	return (
		<div
			data-test="component-profile-order"
			className=" container ">
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
