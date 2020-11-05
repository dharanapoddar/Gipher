package com.stackroute.giphermanager.model;


import io.swagger.annotations.ApiModel;
import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "bookmark",
uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "gif_id"})}
)
@ApiModel(description = "All details about the Bookmark. ")
public class Bookmark {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	
	@Column(name = "gif_id", length=20)
	private String gifId;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
    private User user;
	
	public String getGifId() {
		return gifId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public void setGifId(String gifId) {
		this.gifId = gifId;
	}
	
	public Bookmark() {
		
	}
	
	public Bookmark(long id, String gifId, User user) {
	super();
	this.id = id;
	this.gifId = gifId;
	this.user = user;
	}
	 

	
}
