import React, { useEffect, useState } from "react";
import BookService from "../../service/BookService";
import BookDetail from "../BookDetails";

function BookItem({ book, setSelectedBook }) {
	const handleClick = () => {
		setSelectedBook(book);
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
					<div className="py-2 pe-2 ">
						<h6 className="card-title mb-0">
							{book.title}
						</h6>
						<small
							style={{ fontSize: "12px" }}
							className="text-muted">
							{book.author}
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
