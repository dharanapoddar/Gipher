package com.stackroute.accountmanager.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stackroute.accountmanager.model.DAOUser;


@Repository
//public interface UserDao extends CrudRepository
public interface UserDao extends JpaRepository<DAOUser, Long>  {
	DAOUser findByUsername(String username);
	
	@Query("Select u.id from DAOUser u where u.username= :username")
	public Long findIdByUsername(@Param("username") String username);
	
	DAOUser findByUsernameAndPassword(String username,String password);
	
}



