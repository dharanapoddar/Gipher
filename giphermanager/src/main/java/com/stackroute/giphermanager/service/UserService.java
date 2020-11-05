package com.stackroute.giphermanager.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stackroute.giphermanager.exception.ResourceNotFoundException;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.repository.BookmarkRepository;
import com.stackroute.giphermanager.repository.UserRepository;



@Service
public class UserService implements UserDetailsService  {
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws ResourceNotFoundException {

		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new ResourceNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}
	
	 public String getUsername() {
	       SecurityContext securityContext = SecurityContextHolder.getContext();
	       return securityContext.getAuthentication().getName();
	   }
	 
	 
	public long loadUserIdByUsername(String username) throws Exception {

		Long userId = userRepository.findIdByUsername(username);	
		if (userId == null) {
			throw new ResourceNotFoundException("User not found with username: " + username);
		}
		else 
			return userId;
		
	}

	public User findById(Long userId) {
		
try{
	return userRepository.findById(userId).get();
			
		}
		catch(Exception e)
    	{
    		throw new ResourceNotFoundException("No User Available");
    	}
		
		
	}

	

}
