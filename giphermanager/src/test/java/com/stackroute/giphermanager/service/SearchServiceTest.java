package com.stackroute.giphermanager.service;

import static org.junit.Assert.*;

import org.junit.Test;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import com.stackroute.giphermanager.model.Search;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.repository.SearchRepository;

@SpringBootTest
public class SearchServiceTest {

	@Mock
    private SearchRepository searchRepository;
	
	@InjectMocks
	private SearchService searchService;
	
	Search search = new Search();
	
	
	User user = new User();
	
	@Before
	public void setUpMock() {
      MockitoAnnotations.initMocks(this);
      user.setId(1);
		
      search.setSearchKey("xyz");
     search.setUser(user);
		
	}
	
	@Test
	public void test() {
		assertNotNull(searchService);
	}
	
	@Test
	public void testsave() {
		searchService.save(search);
		verify(searchRepository, times(1)).save(search);
	}
	
	


}
