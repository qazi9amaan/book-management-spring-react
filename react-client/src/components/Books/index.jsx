import React from "react";
import BookService from "../../service/BookService";
import BookDetails from "../BookDetails";
import BookItem from "./BookItem";
import PropTypes from "prop-types";

function Books({ category }) {
	const [bookState, setBookState] = React.useState({
		books: [],
		selectedBook: {
			title: null,
		},
		error: null,
		isLoading: true,
	});

	const { error, isLoading, books, selectedBook } =
		bookState;

	const setbooks = (books) => {
		setBookState({
			...bookState,
			books: books,
			isLoading: false,
		});
	};

	const setSelectedBook = (selectedBook) => {
		setBookState({
			...bookState,
			selectedBook: selectedBook,
		});
	};

	const setError = (error) => {
		setBookState({
			...bookState,
			isLoading: false,
			error: error,
		});
	};
	const chooseSelectedBookTitle = (title) => {
		setSelectedBook(title);
	};

	React.useEffect(() => {
		if (category === "all") {
			BookService.getAllBooks()
				.then((res) => {
					setbooks(res.data);
				})
				.catch((err) => {
					setError(err.message);
				});
		} else {
			BookService.getBooksByCategory(category)
				.then((res) => {
					setbooks(res.data);
				})
				.catch((err) => {
					setError(err.message);
				});
		}
	}, [category]);

	return (
		<div data-test="component-books">
			{isLoading ? (
				<div
					data-test="loading-spinner"
					className="text-center">
					<div
						className="spinner-border text-primary"
						role="status"></div>
				</div>
			) : error ? (
				<div
					data-test="error-message"
					className="text-center">
					<div className="alert text-danger">{error}</div>
				</div>
			) : (
				<div data-test="books-list">
					{selectedBook.title !== null ? (
						<BookDetails book={selectedBook} />
					) : (
						""
					)}
					<div className="row row-cols-2 row-cols-md-5 mt-4 ms-3 g-2">
						{books.map((book) => (
							<BookItem
								setSelectedBook={chooseSelectedBookTitle}
								book={book}
								key={book.bid}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

Books.propTypes = {
	category: PropTypes.string.isRequired,
};

export default Books;
