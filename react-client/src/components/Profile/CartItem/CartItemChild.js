import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeBook } from "../../../store/slices/userSlice";
import PropTypes from "prop-types";

function ItemChild({ book }) {
	const dispatch = useDispatch();

	const removeCart = (book) => {
		dispatch(removeBook(book));
	};
	return (
		<div
			data-test="component-cart-item"
			className="d-flex justify-content-between align-items-center">
			<div className="d-flex justify-content-between align-items-center mb-2 pb-2 p-4 border-bottom ">
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
			<MdOutlineRemoveCircleOutline
				onClick={() => {
					removeCart(book);
				}}
				style={{
					fontSize: "2.6rem",
					opacity: 0.7,
					cursor: "pointer",
				}}
			/>
		</div>
	);
}

ItemChild.propTypes = {
	book: PropTypes.shape({
		bid: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.string,
		description: PropTypes.string,
		cover: PropTypes.string,
	}),
};

export default ItemChild;
