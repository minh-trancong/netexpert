package com.backend.netexpert.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.tokens.BlockMappingStartToken;

import com.backend.netexpert.entity.Blogs;
import com.backend.netexpert.repository.BlogsRepository;

@Service
public class BlogsService {

    @Autowired
    BlogsRepository blogsRepository;

    public int size()
    {
        return (int) blogsRepository.count();
    }
    public List<Blogs> getBlogsInRange(int L, int R) {
        // Fetch total number of rows
        long totalRows = blogsRepository.count();

        // Adjust R to avoid exceeding total rows
        if (R > totalRows) {
            R = (int) totalRows;
        }
        if (L > R)
        {
            return Collections.emptyList();
        }   

        // Fetch the data in the range using pagination
        return blogsRepository.findBlogsInRange(L - 1, R - L + 1); 
    }
    
    public boolean existsById(int id)
    {
        return blogsRepository.existsById(id);
    }
    public Blogs findBlogById (int id)
    {
        return blogsRepository.findById(id);
    }
    public List<Blogs> getAllBlogs()
    {
        return blogsRepository.findAll();
    }
}
