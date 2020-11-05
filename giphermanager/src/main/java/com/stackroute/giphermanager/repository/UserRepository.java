package com.stackroute.giphermanager.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.stackroute.giphermanager.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long>  {
	
	
	@Query("Select u.id from User u where u.username= :username")
	public Long findIdByUsername(@Param("username") String username);
	
	User findByUsername(String username);
	

	

	
	

	
	
}


