package com.stackroute.giphermanager.repository;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.giphermanager.model.User;

import org.junit.Test;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
	
//	@Autowired    
//	TestEntityManager entityManager;    
	
	@Autowired    
	UserRepository repository;    

	@Test
	public void test() {
		assertNotNull(repository);
	}
	
  
	 @After
		public void tearDown() {
			repository.deleteAllInBatch();
		}	
	 
	@Test
	public void testFindByUsername() 
	{
		final User user =new User();
		user.setUsername("apple");
		user.setPassword("apple");
		repository.save(user);
		User Expectedoutput = repository.findByUsername(user.getUsername());
		assertEquals(Expectedoutput, user);	
	}

	@Test
	public void testFindIdByUsername() 
	{
		final User user =new User();
		user.setUsername("apple");
		user.setPassword("apple");
		repository.save(user);
		Long Expectedoutput = repository.findIdByUsername(user.getUsername());
		assertEquals(Expectedoutput.longValue(), user.getId());	
	}

}
