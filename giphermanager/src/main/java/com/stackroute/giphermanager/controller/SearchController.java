package com.stackroute.giphermanager.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.giphermanager.exception.ResourceAlreadyExistsException;
import com.stackroute.giphermanager.exception.ResourceNotFoundException;
import com.stackroute.giphermanager.model.Bookmark;
import com.stackroute.giphermanager.model.Favourite;
import com.stackroute.giphermanager.model.Search;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.service.SearchService;
import com.stackroute.giphermanager.service.UserService;

@CrossOrigin
@RestController
public class SearchController {

	@Autowired
	SearchService searchService;
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value= "/RecordSearchGif" , method = RequestMethod.POST)
	public ResponseEntity<?> RecordSearchGif(@RequestBody Map<String, String> body) throws Exception {
		ResponseEntity responseEntity;
		Search search = new Search();
		String key = body.get("key");
		
		try {
		String userName = userService.getUsername();
		Long userId = userService.loadUserIdByUsername(userName);
		User user = userService.findById(userId);
		search.setSearchKey(key);
		search.setUser(user);
		searchService.save(search);
		responseEntity = new ResponseEntity<Search>(search, HttpStatus.OK);
		}
		catch (ResourceNotFoundException e) {
			responseEntity = new ResponseEntity<Object>(e,HttpStatus.NOT_FOUND);
		}
		catch (Exception e) {
			responseEntity = new ResponseEntity<String>("internal server error. please try after some time", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	    return responseEntity;
	}
	
	
}
