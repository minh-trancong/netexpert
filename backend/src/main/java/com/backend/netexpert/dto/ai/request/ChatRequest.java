package com.backend.netexpert.dto.ai.request;

import java.util.List;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@Data
public class ChatRequest{

    private String user_id;
    private String location;
    List<History> history; 

    @Builder
    @Data
    public static class History
    {
        String role;
        List<String> Parts;
    }
}