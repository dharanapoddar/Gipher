package com.stackroute.giphermanager.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stackroute.giphermanager.exception.ResourceAlreadyExistsException;
import com.stackroute.giphermanager.exception.ResourceNotFoundException;
import com.stackroute.giphermanager.model.Favourite;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.repository.FavouriteRepository;

@Service
@Transactional
public class FavouriteService {
	
	@Autowired
    private FavouriteRepository favouriteRepository;
	
	public void save(Favourite favourite) {
		try {
			favouriteRepository.save(favourite);
    	}
    	catch(Exception e)
    	{
    		throw new ResourceAlreadyExistsException("Already Favourited"+favourite.getGifId());
    	}
	
    }

	
	public void deleteFavourite(User user, String gifId) {
		try {
			favouriteRepository.deleteFavourite(user,gifId);
    	}
    	catch(Exception e)
    	{
    		throw new ResourceNotFoundException("No Resource found for "+user.getUsername());
    	}
    }
	
	 public List<String> getGifIdsofUser(User user) {
			List<String> gifIds = new ArrayList<>();
			gifIds = favouriteRepository.getGifIdsofUser(user);
			if(gifIds.isEmpty()) {
				throw new ResourceNotFoundException("No Resource found for "+user.getUsername());
			}
				return gifIds;
			}
		    
		

}
