package com.project.booksManagement.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

@Entity
public class Ratings implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	 Integer ratingId;
		
	String mcid;
	
	String mbid;
	
	String rating;
	


	public Ratings(Integer ratingId, String mcid, String mbid, String rating) {
		super();
		this.ratingId = ratingId;
		this.mcid = mcid;
		this.mbid = mbid;
		this.rating = rating;
	}
	
	

	public Ratings() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Integer getRatingId() {
		return ratingId;
	}

	public void setRatingId(Integer ratingId) {
		this.ratingId = ratingId;
	}

	

	

	public String getRating() {
		return rating;
	}



	public void setRating(String rating) {
		this.rating = rating;
	}



	public String getMcid() {
		return mcid;
	}



	public void setMcid(String mcid) {
		this.mcid = mcid;
	}


	public String getMbid() {
		return mbid;
	}


	public void setMbid(String mbid) {
		this.mbid = mbid;
	}






	
	
	 
	 
}
