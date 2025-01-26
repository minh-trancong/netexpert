package com.backend.netexpert.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.netexpert.dto.fe.response.GetBlogListResponse;
import com.backend.netexpert.entity.Blogs;
import com.backend.netexpert.service.BlogsService;

@RestController
@RequestMapping("blogs")
public class BlogsController {

    @Autowired
    private BlogsService blogsService;

    @GetMapping()
    GetBlogListResponse searchBlogsWithParam(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        int L = (page - 1) * limit + 1;
        int R = page * limit;
        System.out.println(L);
        List<Blogs> blogs = blogsService.getBlogsInRange(L, R); // Modify to match category later

        List<GetBlogListResponse.Blogs> responseBlogsList = new ArrayList<>();

        for (Blogs blog : blogs) {
            GetBlogListResponse.Blogs tmp = GetBlogListResponse.Blogs.builder()
                    .blog_id(blog.getId())
                    .title(blog.getTitle())
                    .summary(blog.getSummary())
                    .created_at(blog.getCreate_at())
                    .thumbnail(blog.getThumbnail())
                    .category(blog.getCategory())
                    .build();

            responseBlogsList.add(tmp);
        }
        return GetBlogListResponse.builder()
                .total(blogsService.size())
                .page(page)
                .limit(limit)
                .blogs(responseBlogsList)
                .build();
    }

    @GetMapping("/{blog_id}")
    public ResponseEntity<?> getBlogById(@PathVariable int blog_id) {
        if (!blogsService.existsById(blog_id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        }
        Blogs blogs = blogsService.findBlogById(blog_id);

        List<String> listImage = new ArrayList<>();
        listImage.add(blogs.getThumbnail()); 

        Map<String, Object> response = new HashMap<>(); // Initialize the response map

        response.put("blog_id", blog_id);
        response.put("title", blogs.getTitle());
        response.put("content", blogs.getContent());
        response.put("images", listImage);
        response.put("created_at", blogs.getCreate_at());
        response.put("category", blogs.getCategory());

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response); // Corrected return type
    }

    @GetMapping("test")
    List<Blogs> testGetRange(@RequestParam("L") int L, @RequestParam("R") int R) {
        return blogsService.getBlogsInRange(L, R);
    }
}
