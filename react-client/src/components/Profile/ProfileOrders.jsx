import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderService from "../../service/OrderService";
import ParentOrders from "./ProfileOrders/ParentOrders";
import ChildOrders from "./ProfileOrders/ChildOrders";

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
		<div data-test="component-profile-order">
			<ParentOrders
				orders={orders}
				setchildView={setchildView}
				setChildBooks={setChildBooks}
			/>
		</div>
	) : (
		<div data-test="component-profile-order">
			<ChildOrders
				setchildView={setchildView}
				orders={childBooks}
			/>
		</div>
	);
};

export default Profileorders;
