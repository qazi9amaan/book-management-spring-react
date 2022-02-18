package com.project.booksManagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.booksManagement.model.Books;
import com.project.booksManagement.model.Category;

@Repository
public interface BooksDao extends JpaRepository<Books, Integer>{

	List<Books> findAllByCategory(Category category);
}
