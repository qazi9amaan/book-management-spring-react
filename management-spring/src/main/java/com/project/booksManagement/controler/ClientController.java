package com.project.booksManagement.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.booksManagement.model.Ratings;
import com.project.booksManagement.service.ServiceImpl;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("/api/c/")
public class ClientController {

	@Autowired
	ServiceImpl service;
	
	@GetMapping("/ratings")
	public List<Ratings> getRatings(){
		return service.viewRatings();
	}
	
	@PostMapping("/ratings/add")
	public Ratings addRatings(@RequestBody Ratings ratings){
		return service.addRatings(ratings);
	}
	
}
