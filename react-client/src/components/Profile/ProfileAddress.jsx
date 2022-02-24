import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressService from "../../service/AddressService";
import AddressItem from "./AddressItem/AddressItem";

const Profileaddress = () => {
	const user = useSelector((state) => state.user.user);
	const [addresses, setaddresses] = useState([]);

	useEffect(() => {
		AddressService.getAddressByUser(user.cid)
			.then((res) => {
				setaddresses(res.data);
			})
			.catch((err) => {});
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
					{addresses &&
						addresses.map((address) => (
							<AddressItem
								key={address.aid}
								address={address}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default Profileaddress;
