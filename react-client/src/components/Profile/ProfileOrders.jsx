import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderService from "../../service/OrderService";
import ParentOrders from "./ProfileOrders/ParentOrders";
import ChildOrders from "./ProfileOrders/ChildOrders";

const Profileorders = () => {
	const user = useSelector((state) => state.user.user);
	const [componentState, setComponentState] =
		React.useState({
			orders: [],
			childView: false,
			childOrders: null,
			isLoading: true,
			error: null,
		});

	const {
		orders,
		childView,
		childOrders,
		isLoading,
		error,
	} = componentState;

	const setchildView = (view) => {
		setComponentState({
			...componentState,
			childView: view,
		});
	};
	const setChildOrders = (o) => {
		console.log("inside the fn");
		console.log(o);

		setComponentState({
			...componentState,
			childOrders: o,
			childView: true,
		});

		console.log("waiting for state change");
		console.log(componentState);
	};

	React.useEffect(() => {
		OrderService.getAllOrdersFor(user.cid)
			.then((res) => {
				console.log(res.data);
				setComponentState({
					...componentState,
					orders: res.data,
					isLoading: false,
				});
			})
			.catch((e) => {
				setComponentState({
					...componentState,
					error: e.message,
					isLoading: false,
				});
			});
	}, []);

	return (
		<div data-test="component-profile-order">
			{isLoading ? (
				<div
					data-test="loading-spinner"
					className="d-flex justify-content-center">
					<div
						className="spinner-border"
						role="status"></div>
				</div>
			) : (
				<>
					{error ? (
						<div
							data-test="error-message"
							className="text-center text-danger">
							{error}
						</div>
					) : (
						<>
							{!childView ? (
								<div data-test="component-profile-order">
									<ParentOrders
										orders={orders}
										setChildBooks={setChildOrders}
									/>
								</div>
							) : (
								<div data-test="component-profile-order">
									<ChildOrders
										setchildView={setchildView}
										orders={childOrders}
									/>
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Profileorders;
