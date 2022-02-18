package com.project.booksManagement.service;

import java.util.List;

import com.project.booksManagement.model.Admin;

public interface AdminService {
	
	public Admin addAdmin(Admin admin) ;
	public Admin updteAdmin(Admin admin,Integer id);
	public void deleteAdmin(Integer id);
	public List<Admin> viewAdmins();
	public Admin getAdmin(Integer id);
		

}
