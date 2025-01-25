package com.backend.netexpert.dto.ai.request;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class ChatRequest {
    private String userId; // Ensure this is a String
    private String location;
    private List<ChatHistory> history;

    @Data
    @Builder
    public static class ChatHistory {
        private String role;
        private List<String> parts;
    }
}