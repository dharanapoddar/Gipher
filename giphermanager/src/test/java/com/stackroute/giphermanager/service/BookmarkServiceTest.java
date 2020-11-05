package com.stackroute.giphermanager.service;

import static org.junit.Assert.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.stackroute.giphermanager.model.Bookmark;
import com.stackroute.giphermanager.model.User;
import com.stackroute.giphermanager.repository.BookmarkRepository;

@SpringBootTest
public class BookmarkServiceTest {


	@Mock
	private BookmarkRepository bookmarkRepository;
	
	@InjectMocks
	private BookmarkService bookmarkService;
	
	Bookmark bookmark1 = new Bookmark();
	Bookmark bookmark2 = new Bookmark();
	List<Bookmark> bookmarks= new ArrayList<Bookmark>();
	
	User user = new User();
	
	@Before
	public void setUpMock() {
      MockitoAnnotations.initMocks(this);
      user.setId(1);
		//set bookmark1 properties
		//set bookmark2 properties
		bookmark1.setGifId("xyz");
		bookmark2.setGifId("xyz");
		bookmark1.setUser(user);
		bookmark2.setUser(user);
		bookmarks.add(bookmark1);
		bookmarks.add(bookmark2);
		
	}
	
	@Test
	public void test() {
		assertNotNull(bookmarkService);
	}
	
	@Test
	public void testlistAll(){
	when(bookmarkRepository.findAll()).thenReturn(bookmarks);
	List<Bookmark> expectedOutput = bookmarkService.listAll();
	assertEquals(expectedOutput.size(),2);
	}
	
	@Test
	public void tsetGetGifIdsofUser(){
		List<String> gifIds = new ArrayList<>();
		gifIds.add("ayz");
		gifIds.add("xyz");
		
	when(bookmarkRepository.getGifIdsofUser(user)).thenReturn(gifIds);
	List<String> expectedOutput = bookmarkService.getGifIdsofUser(user);
	assertEquals(expectedOutput.size(),2);
	}
	
	@Test
	public void testsave() {
		bookmarkService.save(bookmark1);
		verify(bookmarkRepository, times(1)).save(bookmark1);
	}
	
	@Test
	public void testDeleteBookmark() {
		bookmarkService.deleteBookmark(user,"xyz");
		verify(bookmarkRepository, times(1)).deleteBookmark(user, "xyz");
	}

	
}
