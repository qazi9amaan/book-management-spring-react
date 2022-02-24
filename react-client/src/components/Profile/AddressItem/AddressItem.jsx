import PropTypes from "prop-types";

function AddressItem({ address }) {
	return (
		<button
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

AddressItem.propTypes = {
	address: PropTypes.object.isRequired,
};

export default AddressItem;
