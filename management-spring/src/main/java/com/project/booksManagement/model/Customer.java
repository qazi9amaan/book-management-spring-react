package com.project.booksManagement.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Integer cid;
	String fullName;
	
	@Column(unique = true)
	String phoneNumber;
	
	@OneToMany(fetch = FetchType.LAZY)
	Collection<Address> address = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY)
	Collection<BookOrder> orders = new ArrayList<>();

	public Integer getCid() {
		return cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Collection<Address> getAddress() {
		return address;
	}

	public void setAddress(Collection<Address> address) {
		this.address = address;
	}

	public Collection<BookOrder> getOrders() {
		return orders;
	}

	public void setOrders(Collection<BookOrder> orders) {
		this.orders = orders;
	}

	public Customer(Integer cid, String fullName, String phoneNumber, Collection<Address> address,
			Collection<BookOrder> orders) {
		super();
		this.cid = cid;
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.orders = orders;
	}

	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
