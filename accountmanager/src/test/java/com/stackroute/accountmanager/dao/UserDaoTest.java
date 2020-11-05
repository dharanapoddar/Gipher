package com.stackroute.accountmanager.dao;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.accountmanager.model.DAOUser;



@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserDaoTest {
	
	@Autowired    
	UserDao userDao;    

	@Test
	public void test() {
		assertNotNull(userDao);

	}
	
	 @After
		public void tearDown() {
			userDao.deleteAllInBatch();
		}	
	 
	@Test
	public void testFindByDAOUsername() 
	{
		final DAOUser user =new DAOUser();
		user.setUsername("apple");
		user.setPassword("apple");
		userDao.save(user);
		DAOUser Expectedoutput = userDao.findByUsername(user.getUsername());
		assertEquals(Expectedoutput, user);	
	}

	@Test
	public void testFindIdByDAOUsername() 
	{
		final DAOUser user =new DAOUser();
		user.setUsername("apple");
		user.setPassword("apple");
		userDao.save(user);
		Long Expectedoutput = userDao.findIdByUsername(user.getUsername());
		assertEquals(Expectedoutput.longValue(), user.getId());	
	}

}
