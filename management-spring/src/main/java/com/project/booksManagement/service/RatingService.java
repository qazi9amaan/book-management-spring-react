package com.project.booksManagement.service;

import java.util.List;

import com.project.booksManagement.model.Ratings;

public interface RatingService {

	public Ratings addRatings(Ratings Customer) ;
	public Ratings updteRatings(Ratings Customer,Integer id);
	public void deleteCustomer(Integer id);
	public List<Ratings> viewRatings();
	public Ratings getRatings(Integer id);
}
