package com.project.booksManagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.booksManagement.model.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category, Integer> {

	Category findByName(String name);
}
