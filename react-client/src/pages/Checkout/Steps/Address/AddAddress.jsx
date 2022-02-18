import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddressService from "../../../../service/AddressService";
import { BiArrowBack } from "react-icons/bi";
import Navbar from "../../../../components/Navbar";
const states = [
	"Andhra Pradesh",
	"Arunachal Pradesh ",
	"Assam",
	"Bihar",
	"Chhattisgarh",
	"Goa",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jammu and Kashmir",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Nagaland",
	"Odisha",
	"Punjab",
	"Rajasthan",
	"Sikkim",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttar Pradesh",
	"Uttarakhand",
	"West Bengal",
	"Andaman and Nicobar Islands",
	"Chandigarh",
	"Dadra and Nagar Haveli",
	"Daman and Diu",
	"Lakshadweep",
	"National Capital Territory of Delhi",
	"Puducherry",
];

function AddAddress({ setStep }) {
	const user = useSelector((state) => state.user.user);
	const [btn, setBtn] = useState({
		disabled: false,
		text: "Add address",
	});

	const [address, setaddress] = useState({
		customerName: "",
		phoneNumber: "",
		address: "",
		mstate: "",
		pincode: "",
		customerId: "",
	});

	const handleChange = (e) => {
		setaddress({
			...address,
			[e.target.name]: e.target.value,
		});
	};

	const onClick = (e) => {
		e.preventDefault();
		setaddress({
			...address,
			customerId: user.cid,
		});
		console.log(address);

		setBtn({
			disabled: true,
			text: "Please wait...",
		});
		setTimeout(() => {
			AddressService.addAddress(address).then((res) => {
				window.history.back();
			});
			setBtn({
				disabled: false,
				text: "Add address",
			});
		}, 1300);
	};
	return (
		<>
			<Navbar />
			<div className="container col-md-6 mt-5">
				<BiArrowBack
					style={{ cursor: " pointer" }}
					className="fs-2 mb-3 "
					onClick={() => {
						window.history.back();
					}}
				/>
				<h3>Add an address</h3>
				<p className="w-75">
					Please enter your address details. We will use
					this address to deliver your books.
				</p>
				<form class="row g-3 mt-2">
					<div class="col-6">
						<label for="inputName" class="form-label">
							Name
						</label>
						<input
							type="text"
							class="form-control"
							id="inputName"
							placeholder="Name"
							name="customerName"
							onChange={handleChange}
							value={address.customerName}
						/>
					</div>
					<div class="col-6">
						<label for="inputName" class="form-label">
							Phone number
						</label>
						<input
							name="phoneNumber"
							type="text"
							class="form-control"
							id="inputName"
							placeholder="Phone numebr"
							onChange={handleChange}
							value={address.phoneNumber}
						/>
					</div>

					<div class="col-md-6">
						<label for="inputCity" class="form-label">
							City
						</label>
						<input
							type="text"
							class="form-control"
							id="inputCity"
						/>
					</div>
					<div class="col-md-4">
						<label for="inputState" class="form-label">
							State
						</label>
						<select
							id="inputState"
							name="mState"
							value={address.mstate}
							onChange={(e) => {
								setaddress({
									...address,
									mstate: e.target.value,
								});
							}}
							class="form-select">
							{states.map((state) => (
								<option value={state}>{state}</option>
							))}
						</select>
					</div>
					<div class="col-md-2">
						<label for="inputZip" class="form-label">
							Zip
						</label>
						<input
							onChange={handleChange}
							type="text"
							name="pincode"
							value={address.pincode}
							class="form-control"
							id="inputZip"
						/>
					</div>

					<div class="col-12">
						<label for="inputAddress" class="form-label">
							Address
						</label>
						<textarea
							onChange={handleChange}
							name="address"
							class="form-control"
							placeholder="Address"
							id="inputAddress"
							value={address.address}
							style={{ height: "100px" }}></textarea>
					</div>
					<div class="col-12">
						<button
							disabled={btn.disabled}
							onClick={onClick}
							class="btn btn-primary">
							{btn.text}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
export default AddAddress;

// customerName , phoneNumber ,address, mstate, pincode
