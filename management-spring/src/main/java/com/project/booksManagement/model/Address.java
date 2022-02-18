package com.project.booksManagement.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

@Entity
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Integer aid;
	String customerName;
	String phoneNumber;
	String pincode;
	String mstate;
	String address;
	
	@Transient
	String customerId;
	
	
	
	
	public String getCustomerId() {
		return customerId;
	}


	public Address() {
		// TODO Auto-generated constructor stub
	}


	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}




	public Address(Integer aid, String customerName, String phoneNumber, String pincode, String mstate, String address) {
		super();
		this.aid = aid;
		this.customerName = customerName;
		this.phoneNumber = phoneNumber;
		this.pincode = pincode;
		this.mstate = mstate;
		this.address = address;
	}
	
	
	
	
	public Address(Integer aid, String customerName, String phoneNumber, String pincode, String mstate, String address,
			String customerId) {
		super();
		this.aid = aid;
		this.customerName = customerName;
		this.phoneNumber = phoneNumber;
		this.pincode = pincode;
		this.mstate = mstate;
		this.address = address;
		this.customerId = customerId;
	}




	public Integer getAid() {
		return aid;
	}
	public void setAid(Integer aid) {
		this.aid = aid;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	public String getMstate() {
		return mstate;
	}
	public void setMstate(String mstate) {
		this.mstate = mstate;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}


	

	
}
