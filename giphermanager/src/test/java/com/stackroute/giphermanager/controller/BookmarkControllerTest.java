package com.stackroute.giphermanager.controller;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Matchers.any;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.giphermanager.config.JwtTokenUtil;
import com.stackroute.giphermanager.exception.ResourceAlreadyExistsException;
import com.stackroute.giphermanager.exception.ResourceNotFoundException;
import com.stackroute.giphermanager.model.Bookmark;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.repository.UserRepository;
import com.stackroute.giphermanager.service.BookmarkService;
//import com.stackroute.giphermanager.service.MockTokenAuthenticationService;
import com.stackroute.giphermanager.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
//@WebMvcTest(BookmarkController.class)
public class BookmarkControllerTest{
	
	
	
	@Autowired
	private transient MockMvc mvc;
	
	@MockBean
	private transient JwtTokenUtil jwtTokenUtil;
	
	@MockBean
	private transient BookmarkService bookmarkService;
	
	@MockBean
	private transient UserService userService;
	
	@InjectMocks
	private BookmarkController bookmarkController;
	
	User user = new User();
  	List<String> gifIds = new ArrayList<>();
  	User newUser;
  	String token;
  	UserDetails userDetails;
  	Bookmark bookmark = new Bookmark();

	@Before
	public  void setUpMock() throws Exception {
      MockitoAnnotations.initMocks(this);
		gifIds.add("ayz");
		gifIds.add("xyz");
  	
		user.setId(1);
		user.setUsername("apple");
		user.setPassword("apple");
		newUser = user;
		bookmark.setGifId("xyza");
		bookmark.setUser(newUser);
		
//      token = MockTokenAuthenticationService.createToken(newUser.getUsername());
		 token = "xyzaku";
		when(userService.getUsername()).thenReturn(newUser.getUsername());
      when(userService.loadUserIdByUsername(newUser.getUsername())).thenReturn(newUser.getId());
      when(userService.findById(newUser.getId())).thenReturn(newUser);
      when(userService.getUsername()).thenReturn(newUser.getUsername());
      when(jwtTokenUtil.getUsernameFromToken(token)).thenReturn(newUser.getUsername());
      userDetails = new org.springframework.security.core.userdetails.User(newUser.getUsername(), newUser.getPassword(),
				new ArrayList<>());
      when(userService.loadUserByUsername(newUser.getUsername())).thenReturn(userDetails);
      when(jwtTokenUtil.validateToken(token, userDetails)).thenReturn(true);
	}
	

	@Test
    public void testGetUserBookmarkGIFsWithoutToken() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/getUserBookmarkGIFs")).andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetUserBookmarkGIFsWithToken() throws Exception {
        when(bookmarkService.getGifIdsofUser(newUser)).thenReturn(gifIds);
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.get("/getUserBookmarkGIFs").header("Authorization", "Bearer " + token)).andExpect(status().isOk());
        verify(bookmarkService, times(1)).getGifIdsofUser(newUser);
    }
    
    @Test
    public void testRemoveBookmarkGif() throws Exception {
    	doNothing().when(bookmarkService).deleteBookmark(newUser,"xyz");
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.delete("/removeBookmarkGif/xyz").header("Authorization", "Bearer " + token)).andExpect(status().isOk());
    }
    
    @Test
    public void testRemoveBookmarkGifIfRecordNotExist() throws Exception {
    	doThrow(new ResourceNotFoundException()).when(bookmarkService).deleteBookmark(newUser,"xyz");
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.delete("/removeBookmarkGif/{id}","xyz").header("Authorization", "Bearer " + token)).andExpect(status().isNotFound());
    }
    
    @Test
    public void testBookmarkGif() throws Exception {
    	Map<String, String> body = new HashMap<>();
    	body.put("gifId", "xyza");
    	doNothing().when(bookmarkService).save(bookmark);
		ObjectMapper objectMapper = new ObjectMapper();
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.post("/bookmarkGif").content(objectMapper.writeValueAsString(body)).header("Authorization", "Bearer " + token).contentType("application/json;charset=UTF-8")).andExpect(status().isOk());
    }
    
    @Test
    public void testBookmarkGifIfAlreadyExist() throws Exception {
    	doThrow(new ResourceAlreadyExistsException()).when(bookmarkService).save(any(Bookmark.class));
    	Map<String, String> body = new HashMap<>();
    	body.put("gifId", "xyza");
		ObjectMapper objectMapper = new ObjectMapper();
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.post("/bookmarkGif").content(objectMapper.writeValueAsString(body)).header("Authorization", "Bearer " + token).contentType("application/json;charset=UTF-8")).andExpect(status().isConflict());
    }
}
