import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomerService from "../../service/CustomerService";
import VerificationService from "../../service/VerificationService";
import {
	changeAuth,
	setUser,
} from "../../store/slices/userSlice";

function AuthUser(props) {
	const location = useSelector((state) => state.location);
	const dispatch = useDispatch();

	const [authenticationState, setauthenticationState] =
		React.useState({
			stage: "input",
			phoneNumber: null,
			buttonText: "Send an OTP",
			buttonDisabled: false,
			otp: null,
			error: null,
			hash: null,
		});

	const onChange = (e) => {
		setauthenticationState({
			...authenticationState,
			[e.target.name]: e.target.value,
			error: null,
		});
	};

	const {
		stage,
		phoneNumber,
		buttonText,
		buttonDisabled,
		otp,
		error,
	} = authenticationState;

	const clickHandler = () => {
		if (stage === "input") {
			//verfiy number

			if (phoneNumber.length !== 10) {
				setauthenticationState({
					...authenticationState,
					error: "Please enter a valid phone number",
				});
				return;
			}

			VerificationService.getOtp(phoneNumber).then(
				(res) => {
					console.log(res.data);
					if (res.status === 200) {
						setauthenticationState({
							...authenticationState,
							stage: "verification",
							buttonText: "Verify OTP",
							buttonDisabled: false,
							error: null,
							hash: res.data,
						});
					} else {
						setauthenticationState({
							...authenticationState,
							error: "Something went wrong",
							buttonDisabled: false,
							buttonText: "Send an OTP",
						});
					}
				}
			);
		} else {
			if (otp.length !== 4) {
				setauthenticationState({
					...authenticationState,
					error: "Please enter a valid 4 digit code",
				});
				return;
			}

			if (authenticationState.hash === null) {
				setauthenticationState({
					...authenticationState,
					error: "Something went wrong",
					buttonDisabled: false,
					buttonText: "Send an OTP",
				});
				return;
			}

			const verifyBody = {
				hash: authenticationState.hash,
				otp: otp,
				phoneNumber: phoneNumber,
			};

			setauthenticationState({
				...authenticationState,
				buttonText: "Please wait...",
				buttonDisabled: true,
				error: null,
			});

			VerificationService.verifyOtp(verifyBody)
				.then((res) => {
					if (res.status === 200) {
						CustomerService.getCustomer(phoneNumber).then(
							(res) => {
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
										// navigate(location.location.pathname);
									}, 1000);
								} else {
									// get name
									let name = prompt("Enter your name");
									if (name) {
										const user = {
											fullName: name,
											phoneNumber: phoneNumber,
										};
										CustomerService.addCustomer(user).then(
											(res) => {
												localStorage.setItem(
													"user",
													JSON.stringify(res.data)
												);
												localStorage.setItem("auth", true);
												dispatch(setUser(res.data));
												dispatch(changeAuth(true));
												setTimeout(() => {
													// navigate();
													// location.location.pathname
												}, 1000);
											}
										);
									} else {
										setauthenticationState({
											...authenticationState,
											error: "Please enter a valid name",
										});
									}
								}
							}
						);
					} else {
						setauthenticationState({
							...authenticationState,
							error: "Something went wrong",
							buttonDisabled: false,
							buttonText: "Try again.",
						});
					}
				})
				.catch((e) => {
					console.log(e);
					setauthenticationState({
						...authenticationState,
						error: "Invalid otp, try again.",
						buttonDisabled: false,
						buttonText: "send Again.",
					});
				});
		}
	};

	return (
		<div
			data-test="component-auth"
			style={{ height: "100vh" }}
			className="w-100 
		 d-flex justify-content-center">
			<div
				style={{ borderRadius: "1.5rem", width: "35%" }}
				className="card my-auto shadow-lg border-0  ">
				<div className="card-body mt-4 py-4 px-5 ">
					{stage === "input" && (
						<div data-test="component-phone-number">
							<h3 className="mb-0">Hey, sign in</h3>
							<p className="text-muted mt-0 me-3">
								to proceed ahead...
							</p>
							<div className="mb-3">
								<label
									htmlFor="exampleInputPassword1"
									className="form-label">
									Please enter you phone number
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
									className={`form-control ${
										error ? "is-invalid" : ""
									}`}
									id="exampleInputPassword1"
									onChange={onChange}
								/>
								{error && (
									<div
										data-test="error-comp"
										className="form-text text-danger"
										role="alert">
										{error}
									</div>
								)}
								{!error && (
									<div id="emailHelp" className="form-text">
										We'll send an otp on this number for
										verification.
									</div>
								)}
							</div>
						</div>
					)}

					{stage === "verification" && (
						<>
							<h3 className="mb-0">Verification.</h3>
							<p className="text-muted mt-0 me-3">
								Please provide the otp we've sent you!
							</p>
							<div className="mb-3 pt-2">
								<label className="form-label">
									Enter the otp
								</label>{" "}
								<input
									style={{
										borderRadius: ".5rem",
										padding: ".63rem",
									}}
									name="otp"
									type="text"
									placeholder="0-0-0-0"
									maxLength="4"
									pattern="[0-9]{4}"
									className={`form-control text-center fs-1 text-muted ${
										error ? "is-invalid" : ""
									}`}
									onChange={onChange}
								/>
								{error && (
									<div
										data-test="error-comp"
										className="form-text text-danger"
										role="alert">
										{error}
									</div>
								)}
							</div>
						</>
					)}

					<button
						onClick={clickHandler}
						disabled={buttonDisabled}
						style={{
							borderRadius: ".5rem",
							padding: ".63rem",
						}}
						type="submit"
						className="btn w-100 mt-2 mb-4 
					btn-primary">
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	);
}

export default AuthUser;
