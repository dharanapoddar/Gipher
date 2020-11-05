package com.stackroute.giphermanager.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stackroute.giphermanager.exception.ResourceAlreadyExistsException;
import com.stackroute.giphermanager.exception.ResourceNotFoundException;
import com.stackroute.giphermanager.model.Bookmark;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.repository.BookmarkRepository;

@Service
@Transactional
public class BookmarkService {
	
	@Autowired
    private BookmarkRepository bookmarkRepository;
	
	
    public List<Bookmark> listAll() {
        return bookmarkRepository.findAll();
    }
     
    public void save(Bookmark bookmark) throws ResourceAlreadyExistsException{
		try {
			bookmarkRepository.save(bookmark);
		} catch (Exception e) {
			throw new ResourceAlreadyExistsException("Already Bookmarked" + bookmark.getGifId());
		}
    }
     
    public Bookmark get(long id) {
        return bookmarkRepository.findById(id).get();
    }
     
    public void delete(long id) {
    	bookmarkRepository.deleteById(id);
    }

    
    public void deleteBookmark(User user, String gifId) throws ResourceNotFoundException {
    	try {
    		bookmarkRepository.deleteBookmark(user,gifId);
    	}
    	catch(Exception e)
    	{
    		throw new ResourceNotFoundException("No Resource found for "+user.getUsername());
    	}
    	
    }
    
    
    public List<String> getGifIdsofUser(User user) throws ResourceNotFoundException {
		List<String> gifIds = new ArrayList<>();
			gifIds = bookmarkRepository.getGifIdsofUser(user);
	if(gifIds.isEmpty()) {
		throw new ResourceNotFoundException("No Resource found for "+user.getUsername());
	}
		return gifIds;
	}
    

}
