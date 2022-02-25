import PropTypes from "prop-types";

function ItemChild({ book }) {
	return (
		<div
			data-test="component-item"
			className="d-flex justify-content-between align-items-center mt-3 pb-2 p-4 border rounded-3">
			<div
				style={{
					width: "60%",
				}}
				className="d-flex">
				<img
					alt=""
					src={book.cover}
					style={{ height: "4.6rem" }}
				/>
				<div className="ms-2">
					<h6 className="pb-0 mb-0">{book.title}</h6>
					<p
						style={{
							maxLines: "1",
						}}>
						<small>
							{book.description.substring(0, 100)}
						</small>
					</p>
				</div>
			</div>
			<h4>1</h4>
			<h4>₹{book.price}</h4>
		</div>
	);
}

ItemChild.propTypes = {
	book: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		cover: PropTypes.string.isRequired,
	}),
};
export default ItemChild;
