package com.project.booksManagement.service;

import java.util.List;

import com.project.booksManagement.model.Address;
import com.project.booksManagement.model.Customer;

public interface CustomerService {

	public Customer addCustomer(Customer Customer) ;
	public Customer updteCustomer(Customer Customer,Integer id);
	public void deleteCustomer(Integer id);
	public List<Customer> viewCustomers();
	public Customer getCustomer(Integer id);

	public Customer addAddressToCustomer(Address address,String cid);
	Customer getCustomerByPhone(String id);
}
