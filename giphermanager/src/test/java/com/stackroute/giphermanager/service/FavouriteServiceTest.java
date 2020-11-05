package com.stackroute.giphermanager.service;

import static org.junit.Assert.*;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.stackroute.giphermanager.model.Favourite;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.repository.FavouriteRepository;

@SpringBootTest
public class FavouriteServiceTest {

	
	@Mock
	private FavouriteRepository favouriteRepository;
	
	@InjectMocks
	private FavouriteService favouriteService;
	
	Favourite favourite1 = new Favourite();
	Favourite favourite2 = new Favourite();
	List<Favourite> favourite= new ArrayList<Favourite>();
	
	User user = new User();
	
	@Before
	public void setUpMock() {
      MockitoAnnotations.initMocks(this);
      user.setId(1);
      favourite1.setGifId("xyz");
      favourite2.setGifId("xyz");
      favourite1.setUser(user);
      favourite2.setUser(user);
      favourite.add(favourite1);
      favourite.add(favourite2);
		
	}
	
	@Test
	public void test() {
		assertNotNull(favourite);
	}
	
	
	@Test
	public void testGetGifIdsofUser(){
		List<String> gifIds = new ArrayList<>();
		gifIds.add("ayz");
		gifIds.add("xyz");
		
	when(favouriteRepository.getGifIdsofUser(user)).thenReturn(gifIds);
	List<String> expectedOutput = favouriteService.getGifIdsofUser(user);
	assertEquals(expectedOutput.size(),2);
	}
	
	@Test
	public void testsave() {
		favouriteService.save(favourite1);
		verify(favouriteRepository, times(1)).save(favourite1);
	}
	
	@Test
	public void testDeletFavourite() {
		favouriteService.deleteFavourite(user,"xyz");
		verify(favouriteRepository, times(1)).deleteFavourite(user, "xyz");
	}


}
