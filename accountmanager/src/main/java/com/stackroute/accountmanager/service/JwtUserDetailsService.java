package com.stackroute.accountmanager.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.stackroute.accountmanager.dao.UserDao;
import com.stackroute.accountmanager.model.DAOUser;
import com.stackroute.accountmanager.model.IsAuthenticated;
import com.stackroute.accountmanager.model.UserDTO;
import com.stackroute.accountmanager.exception.ResourceAlreadyExistsException;
import com.stackroute.accountmanager.exception.ResourceNotFoundException;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		DAOUser user = userDao.findByUsername(username);
		if (user == null) {
			throw new ResourceNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}

	public DAOUser save(UserDTO user) {
		DAOUser newUser = new DAOUser();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		DAOUser newUser2 = new DAOUser();
		try {
			newUser2 = userDao.save(newUser);
			return newUser2;
		} catch (Exception e) {
			throw new ResourceAlreadyExistsException("Already Bookmarked" + newUser.getUsername());
		}

	}

	public IsAuthenticated isUserAuthenticated() {
		IsAuthenticated userStatus = new IsAuthenticated();
		userStatus.setIsAuthenticated(true);
		return userStatus;
	}

	public String getUsername() {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		return securityContext.getAuthentication().getName();
	}

	public long loadUserIdByUsername(String username) throws UsernameNotFoundException {

		Long userId = userDao.findIdByUsername(username);
		System.out.print("userDetails" + userId);

		if (userId == null) {
			throw new ResourceNotFoundException("User not found with username: " + username);
		} else
			return userId;

	}
	
}