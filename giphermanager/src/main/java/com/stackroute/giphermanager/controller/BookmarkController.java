package com.stackroute.giphermanager.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.giphermanager.exception.ResourceAlreadyExistsException;
import com.stackroute.giphermanager.exception.ResourceNotFoundException;
import com.stackroute.giphermanager.model.Bookmark;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.service.BookmarkService;
import com.stackroute.giphermanager.service.UserService;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
public class BookmarkController {

	@Autowired
	private BookmarkService bookmarkService;

	@Autowired
	UserService userService;

	@PostMapping(value = "/bookmarkGif")
	public ResponseEntity<?> bookmarkGif(@RequestBody Map<String, String> body) throws Exception {
		ResponseEntity responseEntity;
		String gifId = body.get("gifId");
		Bookmark bookmark = new Bookmark();
		try {
			String userName = userService.getUsername();
			Long userId = userService.loadUserIdByUsername(userName);
			User user = userService.findById(userId);
			bookmark.setGifId(gifId);
			bookmark.setUser(user);
			bookmarkService.save(bookmark);
			responseEntity = new ResponseEntity<Bookmark>(bookmark, HttpStatus.OK);
		} catch (ResourceNotFoundException e) {
			responseEntity = new ResponseEntity<Object>(e, HttpStatus.NOT_FOUND);
		} catch (ResourceAlreadyExistsException e) {
			responseEntity = new ResponseEntity<Object>(e, HttpStatus.CONFLICT);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<String>("internal server error. please try after some time",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return responseEntity;
	}

	@DeleteMapping(path = { "/removeBookmarkGif/{id}" })
	public ResponseEntity<?> removeBookmarkGif(@PathVariable("id") String id) throws Exception {
		ResponseEntity responseEntity;
		Bookmark bookmark = new Bookmark();
		String gifId = id;
		try {
			String userName = userService.getUsername();
			Long userId = userService.loadUserIdByUsername(userName);
			User user = userService.findById(userId);
			bookmark.setGifId(gifId);
			bookmark.setUser(user);
			bookmarkService.deleteBookmark(user, gifId);
			responseEntity = new ResponseEntity<Bookmark>(bookmark, HttpStatus.OK);
		} catch (ResourceNotFoundException e) {
			responseEntity = new ResponseEntity<Object>(e, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<String>("internal server error. please try after some time",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return responseEntity;
	}

	@GetMapping(path = { "/getUserBookmarkGIFs" })
	public ResponseEntity<?> getUserBookmarkGIFs() throws Exception {
		ResponseEntity responseEntity;
		List<String> gifIds = new ArrayList<>();
		String userName = userService.getUsername();
		Long userId = userService.loadUserIdByUsername(userName);
		try {
			User user = userService.findById(userId);
			gifIds = bookmarkService.getGifIdsofUser(user);
			if (!gifIds.isEmpty()) {
				for (String id : gifIds)
					System.out.print(id + " ");
			}
			responseEntity = new ResponseEntity<List<String>>(gifIds, HttpStatus.OK);
		} catch (ResourceNotFoundException e) {
			responseEntity = new ResponseEntity<Object>(e, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<String>("internal server error. please try after some time",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return responseEntity;
	}

}
