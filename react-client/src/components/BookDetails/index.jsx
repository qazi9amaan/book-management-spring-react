import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	addBook,
	addBooktoCart,
} from "../../store/slices/userSlice";
import { TiShoppingCart } from "react-icons/ti";
import { AiFillStar } from "react-icons/ai";
import { getBookRatings } from "../Books/BookItem";

import PropTypes from "prop-types";
function BookDetails({ book }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const buyBook = () => {
		dispatch(addBook(book));
		navigate("/checkout");
	};

	const addToCart = () => {
		dispatch(addBooktoCart(book));
	};

	return (
		<div
			data-test="book-details"
			style={{
				borderTopLeftRadius: "1.4rem",
				borderBottomLeftRadius: "1.4rem",
			}}
			className="offcanvas ps-2  offcanvas-end"
			tabIndex="-1"
			id="offcanvasExample"
			aria-labelledby="offcanvasExampleLabel">
			<div className="offcanvas-body text-center ">
				<div className="  my-3 p-3">
					<img
						alt=""
						style={{
							height: "320px",
							borderRadius: "1.3rem",
							transform: "rotate(-0.02turn)",
						}}
						className="img-fluid "
						src={book.cover}></img>
				</div>
				<h3 className="mt-3 fs-3">{book.title}</h3>

				<p
					className="  text-muted "
					id=""
					style={{ lineHeight: "1.2", fontSize: "14px" }}>
					{book.description}
				</p>

				{/* add here */}
				<div className="mt-3">
					<div className="d-flex justify-content-start align-items-center">
						<small>AUTHOR </small>
						<div
							style={{
								borderRadius: "2rem",
								opacity: "0.8",
							}}
							className="alert-success font-weight-light ms-2  py-1 px-3 ">
							<small>
								<b>{book.author}</b>
							</small>
						</div>
					</div>
					<div className="d-flex justify-content-start mt-2 align-items-center">
						<small>PUBLISHER</small>
						<div
							style={{
								borderRadius: "2rem",
								fontSize: "14px",
								maxLines: "1",
								overflow: "hidden",
								textOverflow: "ellipsis",
								height: "1.9rem",
								opacity: "0.8",
							}}
							className="alert-success font-weight-light ms-2  py-1 px-2 ">
							<b>{book.publisher}</b>
						</div>
					</div>

					<div className="d-flex justify-content-start mt-2 align-items-center">
						<small>YEAR </small>
						<div
							style={{
								borderRadius: "2rem",
								opacity: "0.8",
							}}
							className="alert-success font-weight-light ms-2  py-1 px-3 ">
							<small>
								<b>{book.year}</b>
							</small>
						</div>
					</div>
					<div className="d-flex justify-content-start mt-2 align-items-center">
						<AiFillStar
							style={{
								color: "rgb(249, 210, 50)",
								fontSize: "30px",
							}}
						/>
						{getBookRatings(book)}
					</div>

					<div className="mt-3 d-flex w-100">
						<button
							data-test="book-buyBook"
							onClick={buyBook}
							style={{
								borderRadius: "1rem",
								fontWeight: "bold",
								fontSize: "1.0rem",
								padding: "0.9rem 1rem",
							}}
							type="button"
							className="btn me-2 flex-fill btn-dark  hover-btn">
							Buy Now at ₹{book.price}
						</button>
						<div
							data-test="book-addToCart"
							data-bs-dismiss="offcanvas"
							onClick={addToCart}
							style={{
								borderRadius: "1rem",
								fontWeight: "bold",
								fontSize: "1.0rem",
								padding: "0.9rem 1rem",
							}}
							className="btn btn-success hover-btn">
							<TiShoppingCart
								style={{
									color: "#fff",
									fontWeight: "bold",
									fontSize: "2rem",
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

BookDetails.propTypes = {
	book: PropTypes.object.isRequired,
};

export default BookDetails;
