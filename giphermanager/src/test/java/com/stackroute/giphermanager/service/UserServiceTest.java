package com.stackroute.giphermanager.service;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;

import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.repository.UserRepository;

@SpringBootTest
public class UserServiceTest {
	
	@Mock
	private UserRepository userRepository;
	
	@InjectMocks
	private UserService userservice;
	
	UserDetails userD;

	User user = new User();
	
	
	@Before
	public void setUpMock() {
      MockitoAnnotations.initMocks(this);
      user.setId(1);
		user.setUsername("apple");
		user.setPassword("apple");
		
	}

	@Test
	public void test() {
		assertNotNull(userservice);
	}
	
	@Test
	public void testLoadUserIdByUsername() throws Exception{
	when(userRepository.findIdByUsername(user.getUsername())).thenReturn(user.getId());
	Long userId = userservice.loadUserIdByUsername(user.getUsername());
	assertEquals(userId.longValue(),user.getId());
	}
	
	@Test
	public void testLoadUserByUsername() throws Exception{
	userD=new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),new ArrayList<>());
	when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
	UserDetails ExpectedOutput = userservice.loadUserByUsername(user.getUsername());
	assertEquals(ExpectedOutput,userD);
	}

}
