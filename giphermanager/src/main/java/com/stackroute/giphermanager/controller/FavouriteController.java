package com.stackroute.giphermanager.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.giphermanager.exception.ResourceAlreadyExistsException;
import com.stackroute.giphermanager.exception.ResourceNotFoundException;
import com.stackroute.giphermanager.model.Bookmark;
import com.stackroute.giphermanager.model.Favourite;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.service.FavouriteService;
import com.stackroute.giphermanager.service.UserService;

@CrossOrigin
@RestController
public class FavouriteController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	FavouriteService favouriteService;
	
	
	@PostMapping(value= "/favouriteGif")
	public ResponseEntity<?> favouriteGif(@RequestBody Map<String, String> body) throws Exception {	
		ResponseEntity responseEntity;
		String gifId = body.get("gifId");	
		Favourite favourite = new Favourite();	
		try {
		String userName = userService.getUsername();
		Long userId = userService.loadUserIdByUsername(userName);
		User user = userService.findById(userId);
		favourite.setGifId(gifId);	
		favourite.setUser(user);
		favouriteService.save(favourite);
		responseEntity = new ResponseEntity<Favourite>(favourite, HttpStatus.OK);
		}
		catch (ResourceNotFoundException e) {
			responseEntity = new ResponseEntity<Object>(e,HttpStatus.NOT_FOUND);
		}
		catch (ResourceAlreadyExistsException e) {
			responseEntity = new ResponseEntity<Object>(e,HttpStatus.CONFLICT);
		}
		catch (Exception e) {
			responseEntity = new ResponseEntity<String>("internal server error. please try after some time", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	    return responseEntity;
	   
	}
	
	@DeleteMapping(path = { "/removeFavouriteGif/{id}" })
	public ResponseEntity<?> removeFavouriteGif(@PathVariable("id") String id) throws Exception {
		ResponseEntity responseEntity;
		
		Favourite favourite = new Favourite();
		String gifId = id;
		try {
			String userName = userService.getUsername();
			Long userId = userService.loadUserIdByUsername(userName);
			User user = userService.findById(userId);
			favourite.setGifId(gifId);
			favourite.setUser(user);
			favouriteService.deleteFavourite(user,gifId);
			responseEntity = new ResponseEntity<Favourite>(favourite, HttpStatus.OK);
		}
		catch (ResourceNotFoundException e) {
			responseEntity = new ResponseEntity<Object>(e,HttpStatus.NOT_FOUND);
		}
		catch (Exception e) {
			responseEntity = new ResponseEntity<String>("internal server error. please try after some time", HttpStatus.INTERNAL_SERVER_ERROR);
		}	
			
		 return responseEntity;
	}
	

	
	@GetMapping(path = { "/getUserFavouriteGIFs" })
	public ResponseEntity<?>  getUserFavouriteGIFs() throws Exception {
		ResponseEntity responseEntity;
		List<String> gifIds = new ArrayList<>();
		String userName = userService.getUsername();
		Long userId = userService.loadUserIdByUsername(userName);
		try {
			User user = userService.findById(userId);
			gifIds = favouriteService.getGifIdsofUser(user);
			if(!gifIds.isEmpty())
			{			 for (String id : gifIds) 
		            System.out.print(id + " ");
			}
			responseEntity = new ResponseEntity<List<String>>(gifIds, HttpStatus.OK);
		} catch (ResourceNotFoundException e) {
			responseEntity = new ResponseEntity<Object>(e,HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<String>("internal server error. please try after some time", HttpStatus.INTERNAL_SERVER_ERROR);		}
		return responseEntity;
	}

}
