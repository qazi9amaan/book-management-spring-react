package com.project.booksManagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.booksManagement.model.Ratings;

public interface RatingsDao extends JpaRepository<Ratings, Integer> {

}
