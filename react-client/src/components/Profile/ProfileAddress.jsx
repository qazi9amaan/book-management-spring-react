import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressService from "../../service/AddressService";

const Profileaddress = () => {
	const user = useSelector((state) => state.user.user);
	const [addresses, setaddresses] = useState([]);

	useEffect(() => {
		AddressService.getAddressByUser(user.cid).then(
			(res) => {
				setaddresses(res.data);
			}
		);
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
				<div className="list-group gy-2 mt-4">
					{addresses.map((address) => (
						<AddressItem address={address} />
					))}
				</div>
			</div>
		</div>
	);
};

function AddressItem({ nextStep, address }) {
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				nextStep(address);
			}}
			type="button mt-2"
			className="list-group-item list-group-item-action rounded-3 p-3"
			aria-current="true">
			<div className="d-flex w-100 justify-content-between align-items-center">
				<div className="me-5">
					<h5 className="my-0">{address.customerName}</h5>
					<p className="my-0 ">
						<small>
							{address.address} {address.mstate}
							{"-"}
							{address.pincode}
						</small>
					</p>
				</div>
			</div>
		</button>
	);
}

export default Profileaddress;
