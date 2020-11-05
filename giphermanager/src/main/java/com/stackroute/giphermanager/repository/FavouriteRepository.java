package com.stackroute.giphermanager.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stackroute.giphermanager.model.Favourite;
import com.stackroute.giphermanager.model.User;
public interface FavouriteRepository  extends JpaRepository<Favourite, Long> {
	
	
	@Query("Select b.gifId from Favourite b where b.user= :user")
	public List<String> getGifIdsofUser(@Param("user") User user);
	
	@Modifying
	@Query("Delete from Favourite b where b.user= :user AND b.gifId = :gifId")
	public void deleteFavourite(@Param("user") User user,@Param("gifId") String gifId );

}
