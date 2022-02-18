package com.project.booksManagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.booksManagement.model.Address;

@Repository
public interface AddressDao extends JpaRepository<Address,Integer>{

}
