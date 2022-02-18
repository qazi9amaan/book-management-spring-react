package com.project.booksManagement.model;

import java.beans.JavaBean;

@JavaBean
public class StatsHolder {

	long books;
	long orders;
	long categories;
	long customers;
	public StatsHolder(long books, long orders, long categories, long customers) {
		super();
		this.books = books;
		this.orders = orders;
		this.categories = categories;
		this.customers = customers;
	}
	public StatsHolder() {
		super();
		// TODO Auto-generated constructor stub
	}
	public long getBooks() {
		return books;
	}
	public void setBooks(long books) {
		this.books = books;
	}
	public long getOrders() {
		return orders;
	}
	public void setOrders(long orders) {
		this.orders = orders;
	}
	public long getCategories() {
		return categories;
	}
	public void setCategories(long categories) {
		this.categories = categories;
	}
	public long getCustomers() {
		return customers;
	}
	public void setCustomers(long customers) {
		this.customers = customers;
	}
	
	
}
