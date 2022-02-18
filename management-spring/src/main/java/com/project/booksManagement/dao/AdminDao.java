package com.project.booksManagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.booksManagement.model.Admin;

@Repository
public interface AdminDao extends JpaRepository<Admin,Integer>{

}
