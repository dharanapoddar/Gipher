package com.stackroute.giphermanager.repository;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.giphermanager.model.Favourite;
import com.stackroute.giphermanager.model.User;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class FavouriteRepositoryTest {

	@Autowired
	FavouriteRepository favouriteRepository;
	
	@Autowired    
	UserRepository userRepository;   
	
	User user = new User();
	
	@Test
	public void test() {
		assertNotNull(favouriteRepository);
	}
	
	@Before
	public void tearUp() {
		
		user.setUsername("apple");
		user.setPassword("apple");
		userRepository.save(user);
		final Favourite favourite1 = new Favourite();
		final Favourite favourite2 = new Favourite();
		favourite1.setGifId("xyz");
		favourite1.setUser(user);
		
		favourite2.setGifId("xyza");
		favourite2.setUser(user);
		
		favouriteRepository.save(favourite1);
		favouriteRepository.save(favourite2);
	}
	
	@After
	public void tearDown() {
		favouriteRepository.deleteAllInBatch();
		userRepository.deleteAllInBatch();
		
	}	
 
@Test
public void testGetGifIdsofUser() 
{

	List<String> Expectedoutput = favouriteRepository.getGifIdsofUser(user);
	assertEquals(Expectedoutput.size(), 2);	
}

@Test
public void testDeleteFavourite() 
{

	favouriteRepository.deleteFavourite(user,"xyz");
	List<String> gifIds = favouriteRepository.getGifIdsofUser(user);
	assertEquals(gifIds.size(), 1);	
	
}

}
