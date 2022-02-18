package com.project.booksManagement.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

@Entity
public class BookOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Integer oid;
	
	
	@ManyToMany(fetch = FetchType.LAZY)  
	Collection<Books> books = new ArrayList<>();
	
	@OneToOne  
	Address address;

	@OneToOne
	Customer customer;

	String tracking;
	String status;
	String statusMsg;
	String orderDate;
	Double price;
	
	@Transient
	String customerId;
	@Transient
	String addressId;
	@Transient
	List<String> bookId;
	
	
	
	public BookOrder() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public BookOrder(Integer oid, Collection<Books> books, Address address, Customer customer, String tracking,
			String status, String statusMsg, String orderDate, Double price) {
		super();
		this.oid = oid;
		this.books = books;
		this.address = address;
		this.customer = customer;
		this.tracking = tracking;
		this.status = status;
		this.statusMsg = statusMsg;
		this.orderDate = orderDate;
		this.price = price;
	}
	public BookOrder(Integer oid, Collection<Books> books, Address address, Customer customer, String tracking,
			String status, String statusMsg, String orderDate, Double price, String customerId, String addressId,
			List<String> bookId) {
		super();
		this.oid = oid;
		this.books = books;
		this.address = address;
		this.customer = customer;
		this.tracking = tracking;
		this.status = status;
		this.statusMsg = statusMsg;
		this.orderDate = orderDate;
		this.price = price;
		this.customerId = customerId;
		this.addressId = addressId;
		this.bookId = bookId;
	}
	public Integer getOid() {
		return oid;
	}
	public void setOid(Integer oid) {
		this.oid = oid;
	}
	public Collection<Books> getBooks() {
		return books;
	}
	public void setBooks(Collection<Books> books) {
		this.books = books;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public String getTracking() {
		return tracking;
	}
	public void setTracking(String tracking) {
		this.tracking = tracking;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStatusMsg() {
		return statusMsg;
	}
	public void setStatusMsg(String statusMsg) {
		this.statusMsg = statusMsg;
	}
	public String getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getAddressId() {
		return addressId;
	}
	public void setAddressId(String addressId) {
		this.addressId = addressId;
	}
	public List<String> getBookId() {
		return bookId;
	}
	public void setBookId(List<String> bookId) {
		this.bookId = bookId;
	}
	
	
	
	
}
