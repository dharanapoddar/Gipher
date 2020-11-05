package com.stackroute.giphermanager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
@Entity
@Table(name = "user",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
})
@ApiModel(description = "All details about the User. ")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(length = 15)
	private String username;
	
	@Column
	@JsonIgnore
	private String password;

	
	public long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setId(long id) {
		this.id = id;
	}

}
