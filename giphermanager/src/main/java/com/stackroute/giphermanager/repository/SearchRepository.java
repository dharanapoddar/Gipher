package com.stackroute.giphermanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stackroute.giphermanager.model.Search;

public interface SearchRepository extends JpaRepository<Search, Long> {

}
