import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressService from "../../service/AddressService";
import AddressItem from "./AddressItem/AddressItem";

const Profileaddress = () => {
	const user = useSelector((state) => state.user.user);
	const [componentState, setComponentState] =
		React.useState({
			isLoading: true,
			error: "",
			addresses: [],
		});

	const { addresses, isLoading, error } = componentState;

	React.useEffect(() => {
		AddressService.getAddressByUser(user.cid)
			.then((res) => {
				setComponentState({
					...componentState,
					isLoading: false,
					addresses: res.data,
				});
			})
			.catch((err) => {
				setComponentState({
					...componentState,
					isLoading: false,
					error: err.message,
				});
			});
	}, []);

	return (
		<div
			data-test="component-profile-address"
			className=" container ">
			<div>
				<h4>Saved address</h4>
				<p>
					The following addresses are saved for you. You can
					use them to ship your books.
				</p>
				{isLoading ? (
					<div
						data-test="loading-spinner"
						className="d-flex justify-content-center">
						<div
							className="spinner-border"
							role="status"></div>
					</div>
				) : error ? (
					<div
						data-test="error-message"
						className="text-center text-danger">
						{error}
					</div>
				) : (
					<div className="list-group gy-2 mt-4">
						{addresses.map((address) => (
							<AddressItem
								key={address.aid}
								address={address}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Profileaddress;
