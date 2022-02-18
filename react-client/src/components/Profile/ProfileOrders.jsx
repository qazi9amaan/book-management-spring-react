import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderService from "../../service/OrderService";

const Profileorders = () => {
	const user = useSelector((state) => state.user.user);

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		OrderService.getAllOrdersFor(user.cid).then((res) => {
			setOrders(res.data);
		});
	}, []);
	const getBookName = (books) => {
		return books.map((book) => book.title).join(", ");
	};

	return (
		<div className=" container ">
			<div>
				<div>
					<table class="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Book title</th>
								<th scope="col">Price</th>
								<th scope="col">status</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, index) => (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td>{getBookName(order.books)}</td>
									<td>{order.price}</td>
									<td>
										{order.status == "Cancelled" ? (
											<span className="badge py-1 rounded-pill bg-danger">
												{order.status}
											</span>
										) : (
											<span className="badge py-1 rounded-pill bg-success ">
												{order.status}
											</span>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Profileorders;
