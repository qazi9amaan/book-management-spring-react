import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomerService from "../../service/CustomerService";
import {
	changeAuth,
	setUser,
} from "../../store/slices/userSlice";

function AuthUser(props) {
	const location = useSelector((state) => state.location);

	const [verifyState, setVerifyState] = useState(false);
	const [userDetails, setUserDetails] = useState({});

	return !verifyState ? (
		<UserDetails
			from={location.location.pathname}
			userDetails={userDetails}
			setUserDetails={setUserDetails}
			setVerifyState={setVerifyState}
		/>
	) : (
		<UserVerifyComponent
			from={location.location.pathname}
			userDetails={userDetails}
		/>
	);
}

function UserVerifyComponent({
	userDetails,
	setUserDetails,
	from,
}) {
	const [inputOtp, setinputOtp] = useState("");
	const [inputFullName, setinputFullName] = useState("");
	const [error, seterror] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onClickHandler = () => {
		if (inputOtp == userDetails.otp) {
			const user = {
				fullName: inputFullName,
				phoneNumber: userDetails.phoneNumber,
			};
			CustomerService.addCustomer(user).then((res) => {
				localStorage.setItem(
					"user",
					JSON.stringify(res.data)
				);
				localStorage.setItem("auth", true);
				dispatch(setUser(res.data));
				dispatch(changeAuth(true));
				setTimeout(() => {
					navigate(from);
				}, 1000);
			});
		} else {
			seterror("Invalid otp");
		}
	};

	return (
		<div
			style={{ height: "100vh" }}
			className="w-100 
		 d-flex justify-content-center">
			<div
				style={{ borderRadius: "1.5rem", width: "35%" }}
				className="card my-auto shadow-lg border-0  ">
				<div className="card-body py-4 px-5 ">
					<h3 className="mt-2">Verify details</h3>
					<p className="text-muted me-3">
						A verification code has been sent to your phone
						number.
					</p>
					<div class="my-3 ">
						<label
							for="exampleInputEmail1"
							class="form-label">
							Full Name
						</label>
						<input
							style={{
								borderRadius: ".5rem",
								padding: ".63rem",
							}}
							name="fullName"
							type="text"
							className="form-control "
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							onChange={(e) =>
								setinputFullName(e.target.value)
							}
						/>
					</div>
					<div class="mb-3 mt-4">
						<label
							for="exampleInputEmail1"
							class="form-label">
							Verfication code
						</label>
						<input
							style={{
								borderRadius: ".5rem",
								padding: ".63rem",
							}}
							maxLength="4"
							type="text"
							placeholder="0000"
							pattern="[0-9]*"
							class="form-control"
							onChange={(e) => setinputOtp(e.target.value)}
							id="exampleInputPassword1"
						/>
						<div id="emailHelp" class="form-text">
							Please provide the (0000) sent to you.
						</div>
						{error && (
							<small class="text-danger" role="alert">
								{error}
							</small>
						)}
					</div>
					<button
						onClick={onClickHandler}
						style={{
							borderRadius: ".5rem",
							padding: ".63rem",
						}}
						type="submit"
						class="btn w-100 mt-2 mb-4 btn-primary">
						Verfiy code
					</button>
				</div>
			</div>
		</div>
	);
}

function UserDetails({
	setVerifyState,
	setUserDetails,
	userDetails,
	from,
}) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onClickHandler = () => {
		if (
			userDetails.phoneNumber &&
			userDetails.phoneNumber.length === 10
		) {
			console.log(from);
			CustomerService.getCustomer(
				userDetails.phoneNumber
			).then((res) => {
				console.log(res);
				if (res.data) {
					localStorage.setItem(
						"user",
						JSON.stringify(res.data)
					);
					localStorage.setItem("auth", true);
					dispatch(setUser(res.data));
					dispatch(changeAuth(true));
					setTimeout(() => {
						navigate(from);
					}, 1000);
				} else {
					setUserDetails({
						...userDetails,
						otp: "0000",
					});
					setVerifyState(true);
				}
			});
		}
	};

	return (
		<div
			style={{ height: "100vh" }}
			className="w-100 
		 d-flex justify-content-center">
			<div
				style={{ borderRadius: "1.5rem", width: "35%" }}
				className="card my-auto shadow-lg border-0  ">
				<div className="card-body py-4 px-5 ">
					<h3>Sign In</h3>
					<p className="text-muted me-3">
						Please enter your phone number.
					</p>
					<div class="mb-3">
						<label
							for="exampleInputPassword1"
							class="form-label">
							Phone number
						</label>
						<input
							style={{
								borderRadius: ".5rem",
								padding: ".63rem",
							}}
							name="phoneNumber"
							type="text"
							maxLength="10"
							pattern="[0-9]{10}"
							class="form-control"
							id="exampleInputPassword1"
							onChange={(e) => {
								setUserDetails({
									...userDetails,
									phoneNumber: e.target.value,
								});
							}}
						/>
						<div id="emailHelp" class="form-text">
							We'll never share your details with anyone
							else.
						</div>
					</div>

					<button
						onClick={onClickHandler}
						style={{
							borderRadius: ".5rem",
							padding: ".63rem",
						}}
						type="submit"
						class="btn w-100 mt-2 mb-4 
					btn-primary">
						{" "}
						Send verification code
					</button>
				</div>
			</div>
		</div>
	);
}

export default AuthUser;
