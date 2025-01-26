package com.backend.netexpert.dto.fe.response;

import java.util.List;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class GetBlogListResponse {
    private int total;
    private int page;
    private int limit;
    List<Blogs> blogs;

    @Data
    @Builder
    @Getter
    @Setter
    public static class Blogs 
    {
        private int blog_id;
        private String title;
        private String summary;
        private String thumbnail;
        private String created_at;
        private String category;
    }
}
