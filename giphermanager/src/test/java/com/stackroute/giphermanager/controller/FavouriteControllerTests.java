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
import com.stackroute.giphermanager.model.Favourite;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.repository.UserRepository;
import com.stackroute.giphermanager.service.FavouriteService;
import com.stackroute.giphermanager.service.MockTokenAuthenticationService;
import com.stackroute.giphermanager.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class FavouriteControllerTests{
	
	@InjectMocks
	private FavouriteController favouriteController;
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	JwtTokenUtil jwtTokenUtil;
	
	@MockBean
	private FavouriteService favouriteService;
	
	@MockBean
	private UserService userService;
	
	User user = new User();
  	List<String> gifIds = new ArrayList<>();
  	User newUser;
  	String token;
  	UserDetails userDetails;
  	Favourite favourite = new Favourite();

	@Before
	public  void setUpMock() throws Exception {
      MockitoAnnotations.initMocks(this);
		gifIds.add("ayz");
		gifIds.add("xyz");
  	
		user.setId(1);
		user.setUsername("apple");
		user.setPassword("apple");
		newUser = user;
		favourite.setGifId("xyza");
		favourite.setUser(newUser);
		
//      token = MockTokenAuthenticationService.createToken(newUser.getUsername());
	      token ="xyzau";

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
    public void testGetUserFavouriteGIFsWithoutToken() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/getUserFavouriteGIFs")).andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetUserFavouriteGIFsWithToken() throws Exception {
        when(favouriteService.getGifIdsofUser(newUser)).thenReturn(gifIds);
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.get("/getUserFavouriteGIFs").header("Authorization", "Bearer " + token)).andExpect(status().isOk());
        verify(favouriteService, times(1)).getGifIdsofUser(newUser);
    }
    
    @Test
    public void testRemoveFavouriteGif() throws Exception {
    	doNothing().when(favouriteService).deleteFavourite(newUser,"xyz");
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.delete("/removeFavouriteGif/xyz").header("Authorization", "Bearer " + token)).andExpect(status().isOk());
    }
    
    @Test
    public void testRemoveFavouriteGifIfRecordNotExist() throws Exception {
    	doThrow(new ResourceNotFoundException()).when(favouriteService).deleteFavourite(newUser,"xyz");
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.delete("/removeFavouriteGif/{id}","xyz").header("Authorization", "Bearer " + token)).andExpect(status().isNotFound());
    }
    
    @Test
    public void testFavouriteGif() throws Exception {
    	Map<String, String> body = new HashMap<>();
    	body.put("gifId", "xyza");
    	doNothing().when(favouriteService).save(favourite);
		ObjectMapper objectMapper = new ObjectMapper();
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.post("/favouriteGif").content(objectMapper.writeValueAsString(body)).header("Authorization", "Bearer " + token).contentType("application/json;charset=UTF-8")).andExpect(status().isOk());
    }
    
    @Test
    public void testFavouriteGifIfAlreadyExist() throws Exception {
    	doThrow(new ResourceAlreadyExistsException()).when(favouriteService).save(any(Favourite.class));
    	Map<String, String> body = new HashMap<>();
    	body.put("gifId", "xyza");
		ObjectMapper objectMapper = new ObjectMapper();
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.post("/favouriteGif").content(objectMapper.writeValueAsString(body)).header("Authorization", "Bearer " + token).contentType("application/json;charset=UTF-8")).andExpect(status().isConflict());
    }
}
