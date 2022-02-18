package com.project.booksManagement.service;

import java.util.List;

import com.project.booksManagement.model.BookOrder;

public interface OrderService  {

	public BookOrder addBookOrder(BookOrder BookOrder) ;
	public BookOrder updateBookOrderStatus(BookOrder BookOrder,Integer id);
//	public void deleteBookOrder(Integer id);
	public List<BookOrder> viewAllOrders();
	public BookOrder getBookOrder(Integer id);
	public List<BookOrder> viewAllOrdersForUser(Integer id);

}
