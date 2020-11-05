package com.stackroute.giphermanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.stackroute.giphermanager.model.Search;
import com.stackroute.giphermanager.repository.SearchRepository;

@Service
@Transactional
public class SearchService {
	
	
	@Autowired
    private SearchRepository searchRepository;
	
	public void save(Search search) {
		searchRepository.save(search);
    }

}
