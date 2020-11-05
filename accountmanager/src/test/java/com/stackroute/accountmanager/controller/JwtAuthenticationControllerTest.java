package com.stackroute.accountmanager.controller;

import static org.junit.Assert.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.accountmanager.config.JwtTokenUtil;
import com.stackroute.accountmanager.model.DAOUser;
import com.stackroute.accountmanager.model.UserDTO;
import com.stackroute.accountmanager.service.JwtUserDetailsService;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class JwtAuthenticationControllerTest {

	@InjectMocks
	private JwtAuthenticationController controller;
	
	@Autowired
	private MockMvc mvc;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@MockBean
	JwtTokenUtil jwtTokenUtil;
	
	@MockBean
	private JwtUserDetailsService userService;
	
	UserDTO user = new UserDTO();
	DAOUser newUser = new DAOUser();
	
	@Before
	public  void setUpMock() throws Exception {
      MockitoAnnotations.initMocks(this);
	}
	
	@Test
    public void testRegister() throws Exception {
		user.setUsername("apple");
		user.setPassword("apple");
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
    	when(userService.save(user)).thenReturn(newUser);
		ObjectMapper objectMapper = new ObjectMapper();
		mvc.perform(MockMvcRequestBuilders.post("/register").content(objectMapper.writeValueAsString(user)).contentType("application/json;charset=UTF-8")).andExpect(status().isOk());
    }
	
	
	

}
