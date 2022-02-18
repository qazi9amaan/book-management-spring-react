package com.project.booksManagement.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class Admin {
	@javax.persistence.Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int Id;
	@Column
	String username;
	@Column
	String Password;
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public String getusername() {
		return username;
	}
	public void setusername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public Admin(int id, String username, String password) {
		super();
		Id = id;
		this.username = username;
		Password = password;
	}
	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Admin [Id=" + Id + ", username=" + username + ", Password=" + Password + "]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(Id, Password, username);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Admin other = (Admin) obj;
		return Id == other.Id && Objects.equals(Password, other.Password) && Objects.equals(username, other.username);
	}
	
	

}
