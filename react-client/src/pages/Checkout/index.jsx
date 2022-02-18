import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddressStep from "./Steps/Address";
import AuthStep from "../AuthUser";
import PaymentStep from "./Steps/Payment";
import Navbar from "../../components/Navbar";
const steps = [
	{
		label: "Choose Address",
		component: AddressStep,
	},
	{
		label: "Payment",
		component: PaymentStep,
	},
];

function CheckOutWrapper() {
	const [step, setstep] = useState(0);
	const Step = steps[step].component;

	return (
		<div>
			<Navbar />
			<div className="container">
				<div className="row ">
					<div>
						<Step setStep={setstep} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckOutWrapper;
