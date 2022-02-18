package com.project.booksManagement.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Category implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int catid;

	                                                            
	String name;

	public int getId() {
		return catid;
	}

	public void setId(int id) {
		this.catid = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Category [id=" + catid + ", name=" + name + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(catid, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Category other = (Category) obj;
		return catid == other.catid && Objects.equals(name, other.name);
	}
	

}
