import React, { useEffect, useState } from "react";
import BookService from "../../service/BookService";
import BookDetails from "../BookDetails";
import BookItem from "./BookItem";

function Books({ category }) {
	const [books, setbooks] = useState([]);
	const [selectedBook, setSelectedBook] = useState({
		title: "aaaa",
	});

	useEffect(() => {
		console.log(category);
		if (category === "all") {
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
		<div data-test="component-books">
			{selectedBook.title && (
				<BookDetails book={selectedBook} />
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
		</div>
	);
}

export default Books;
