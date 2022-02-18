import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsArrowRightCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AddressService from "../../../../service/AddressService";

import { setAddress } from "../../../../store/slices/userSlice";

function AddressStep({ setStep }) {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.user);
	const [addresses, setaddresses] = useState([]);
	useEffect(() => {
		console.log(user);
		AddressService.getAddressByUser(user.cid).then(
			(res) => {
				setaddresses(res.data);
			}
		);
	}, []);

	const nextStep = (address) => {
		console.log("setting address");
		console.log(address);
		dispatch(setAddress(address));
		setStep(1);
	};

	return (
		<div className="w-50 container pt-5 mt-4  ">
			<div>
				<BiArrowBack
					style={{ cursor: " pointer" }}
					className="fs-2 mb-3 "
					onClick={() => {
						window.history.back();
					}}
				/>
				<h4>Choose an address</h4>
				<p className="w-75">
					Please choose an address from your address book.
					If you do not have an address book, please add
					one.
				</p>
				<div class="list-group gy-2 mt-4">
					{addresses.map((address) => (
						<AddressItem
							address={address}
							nextStep={nextStep}
						/>
					))}

					<button
						onClick={(e) => {
							e.preventDefault();
							navigate("/address/add");
						}}
						class="list-group-item rounded-3 p-3 list-group-item-action">
						<div class="d-flex w-100 justify-content-between align-items-center">
							<div>
								<h5 class="mb-1">Add an address</h5>
								<small class="text-muted">
									And some muted small print.
								</small>
							</div>
							<AiOutlinePlusCircle
								style={{ fontSize: "2rem" }}
							/>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}

function AddressItem({ nextStep, address }) {
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				nextStep(address);
			}}
			type="button mt-2"
			class="list-group-item list-group-item-action rounded-3 p-3"
			aria-current="true">
			<div class="d-flex w-100 justify-content-between align-items-center">
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
				<BsArrowRightCircle
					style={{ fontSize: "1.9rem" }}
				/>
			</div>
		</button>
	);
}

export default AddressStep;
