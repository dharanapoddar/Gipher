package com.stackroute.giphermanager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModel;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
@Entity
@Table(name = "search")
@ApiModel(description = "All details about the Search. ")
public class Search {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "search_key")
	private String searchKey;
	
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
    private User user;
	
	public String getSearchKey() {
		return searchKey;
	}
	
	public void setSearchKey(String searchKey) {
		this.searchKey = searchKey;
	}
	 
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

}
