package com.backend.netexpert.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.netexpert.entity.Blogs;

@Repository
public interface BlogsRepository extends JpaRepository<Blogs, Integer>  {

    @Query(value = "SELECT * FROM blogs b ORDER BY b.id ASC LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Blogs> findBlogsInRange(@Param("offset") int offset, @Param("limit") int limit);

    Blogs findById(int id);
    boolean existsById(int id);
}
