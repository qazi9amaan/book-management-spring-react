import React, { useState } from "react";
import AddressStep from "./Steps/Address";
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
	const [step, setstep] = React.useState(0);
	const Step = steps[step].component;

	return (
		<div data-test="check-out-wrapper">
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
