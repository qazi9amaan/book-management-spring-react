package com.project.booksManagement.service;

import java.util.List;

import com.project.booksManagement.model.Books;

public interface BooksService {
	
	public Books addBook(Books books);
	public void deleteBook(Integer id);
	public List<Books> viewBooks();
	public Books getBook(Integer id);
	public List<Books> getBookByCategory(String id);
	public Books updateBook(Books book,Integer id);

}
