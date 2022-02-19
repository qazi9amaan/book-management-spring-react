import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import BookService from "../../service/BookService";
import BookDetail from "../BookDetails";

function BookItem({ book, setSelectedBook }) {
	const handleClick = () => {
		setSelectedBook(book);
	};

	const getBookRatings = (book) => {
		let ratings = 0;
		if (book.ratings) {
			ratings = book.ratings.reduce((acc, curr) => {
				return acc + curr.rating;
			}, 0);
			ratings = (ratings / book.ratings.length) % 5;
		}
		return ratings || 0;
	};

	return (
		<>
			<div
				onClick={handleClick}
				style={{ cursor: "pointer" }}
				className="col book-item-hover "
				data-bs-toggle="offcanvas"
				data-bs-target="#offcanvasExample"
				aria-controls="offcanvasExample">
				<div className="p-2 ">
					<img
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
function Books({ category }) {
	const [books, setbooks] = useState([]);
	const [selectedBook, setSelectedBook] = useState({
		title: "aaaa",
	});

	useEffect(() => {
		console.log(category);
		if (category == "all") {
			BookService.getAllBooks().then((res) => {
				setbooks(res.data);
			});
		} else {
			BookService.getBooksByCategory(category).then(
				(res) => {
					setbooks(res.data);
				}
			);
		}
	}, [category]);

	return (
		<>
			{selectedBook.title && (
				<BookDetail book={selectedBook} />
			)}

			<div class="row row-cols-2 row-cols-md-5 mt-4 ms-3 g-2">
				{books.map((book) => (
					<BookItem
						setSelectedBook={setSelectedBook}
						book={book}
						key={book.bid}
					/>
				))}
			</div>
		</>
	);
}

export default Books;
