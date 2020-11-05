package com.stackroute.accountmanager.service;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.stackroute.accountmanager.dao.UserDao;
import com.stackroute.accountmanager.model.DAOUser;


@SpringBootTest
public class JwtUserDetailsServiceTest {
	

	
	@Mock
	private UserDao userDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@InjectMocks
	private JwtUserDetailsService userservice;
	
	UserDetails userD;
	
	DAOUser user = new DAOUser();

	@Test
	public void test() {
		assertNotNull(userservice);
	}

	@Before
	public void setUpMock() {
      MockitoAnnotations.initMocks(this);
      user.setId(1);
		user.setUsername("apple");
		user.setPassword("apple");
		
	}
	
	@Test
	public void testLoadUserByUsername() throws Exception{
	userD=new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),new ArrayList<>());
	when(userDao.findByUsername(user.getUsername())).thenReturn(user);
	UserDetails ExpectedOutput = userservice.loadUserByUsername(user.getUsername());
	assertEquals(ExpectedOutput,userD);
	}

	@Test
	public void testLoadUserIdByUsername() throws Exception{
	when(userDao.findIdByUsername(user.getUsername())).thenReturn(user.getId());
	Long userId = userservice.loadUserIdByUsername(user.getUsername());
	assertEquals(userId.longValue(),user.getId());
	}
	
}
