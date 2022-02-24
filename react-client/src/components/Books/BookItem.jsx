import PropTypes from "prop-types";
import { AiFillStar } from "react-icons/ai";

export const getBookRatings = (book) => {
	let ratings = 0;
	if (book.ratings) {
		ratings = book.ratings.reduce((acc, curr) => {
			return acc + curr.rating;
		}, 0);
		ratings = (ratings / book.ratings.length) % 5;
	}
	return ratings || 0;
};

function BookItem({ book, setSelectedBook }) {
	const handleClick = () => {
		setSelectedBook(book);
	};

	return (
		<>
			<div
				data-test="book-item"
				onClick={handleClick}
				style={{ cursor: "pointer" }}
				className="col book-item-hover "
				data-bs-toggle="offcanvas"
				data-bs-target="#offcanvasExample"
				aria-controls="offcanvasExample">
				<div className="p-2 ">
					<img
						alt={book.title}
						style={{
							width: "88%",
							height: "220px",
							objectFit: "cover",
							borderRadius: "1.2rem",
						}}
						src={book.cover}
						className=" "
					/>
					<div className="py-2 pe-2 d-flex justify-content-between align-items-center ">
						<div className="">
							<h6 className="card-title mb-0">
								{book.title}
							</h6>
							<small
								style={{ fontSize: "12px" }}
								className="text-muted ">
								{book.author}
							</small>
						</div>
						<small
							style={{ fontSize: "12px" }}
							className="text-muted d-flex  me-3">
							<AiFillStar
								style={{
									color: "rgb(249, 210, 50)",
									fontSize: "18px",
								}}
							/>
							{getBookRatings(book)}
						</small>
					</div>
				</div>
			</div>
		</>
	);
}

BookItem.propTypes = {
	book: PropTypes.object.isRequired,
	setSelectedBook: PropTypes.func.isRequired,
};

export default BookItem;
