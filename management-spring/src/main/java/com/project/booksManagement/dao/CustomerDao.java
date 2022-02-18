package com.project.booksManagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.booksManagement.model.Customer;

@Repository
public interface CustomerDao extends JpaRepository<Customer, Integer> {

	Customer findByPhoneNumber(String phoneNumber);
}
