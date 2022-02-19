package com.project.booksManagement.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;


@Entity
public class Books implements Serializable{
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int bid;
	@Column
	String title;
	@Column
	String author;
	@Column
	double price;
	@Column
	int year;
	@Column
	String publisher;
	
    @Lob
	String cover;
	
	@Lob
	String description;
	
	@OneToMany(fetch = FetchType.LAZY)
    Collection<Ratings> ratings;
	
	@Transient
	String categoryName;
	
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_name", referencedColumnName = "catid")
	Category category;

	@ManyToMany(fetch = FetchType.LAZY)  
    Collection<BookOrder> bookOrderId = new ArrayList<>();
	
	
	public Books(int bid, String title, String author, double price, int year, String publisher, String cover,
			String description, Category category) {
		super();
		this.bid = bid;
		this.title = title;
		this.author = author;
		this.price = price;
		this.year = year;
		this.publisher = publisher;
		this.cover = cover;
		this.description = description;
		this.category = category;
	}
	
	public Books(int bid, String title, String author, double price, int year, String publisher, String cover,
			String description, String categoryName) {
		super();
		this.bid = bid;
		this.title = title;
		this.author = author;
		this.price = price;
		this.year = year;
		this.publisher = publisher;
		this.cover = cover;
		this.description = description;
		this.categoryName = categoryName;
	}


	
	

	public Collection<Ratings> getRatings() {
		return ratings;
	}

	public void setRatings(Collection<Ratings> ratings) {
		this.ratings = ratings;
	}

	public Collection<BookOrder> getBookOrderId() {
		return bookOrderId;
	}

	public void setBookOrderId(Collection<BookOrder> bookOrderId) {
		this.bookOrderId = bookOrderId;
	}

	public Books() {
		// TODO Auto-generated constructor stub
	}


	public int getBid() {
		return bid;
	}


	public void setBid(int bid) {
		this.bid = bid;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getAuthor() {
		return author;
	}


	public void setAuthor(String author) {
		this.author = author;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public int getYear() {
		return year;
	}


	public void setYear(int year) {
		this.year = year;
	}


	public String getPublisher() {
		return publisher;
	}


	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}


	public String getCover() {
		return cover;
	}


	public void setCover(String cover) {
		this.cover = cover;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Category getCategory() {
		return category;
	}


	public void setCategory(Category category) {
		this.category = category;
	}


	public String getCategoryName() {
		return categoryName;
	}
	
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
	
}
