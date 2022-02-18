package com.project.booksManagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.booksManagement.model.BookOrder;
import com.project.booksManagement.model.Customer;

public interface OrderDao extends JpaRepository<BookOrder, Integer> {
	List<BookOrder> findByCustomer(Customer customer);
	
}
