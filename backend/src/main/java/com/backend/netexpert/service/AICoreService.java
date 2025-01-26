package com.backend.netexpert.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.backend.netexpert.dto.ai.request.ChatRequest;
import com.backend.netexpert.dto.ai.request.ChatRequest.ChatHistory;
import com.backend.netexpert.entity.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AICoreService {
    @Autowired
    private UserService userService;

    @Value("${local.AI_HTTP}")
    protected String AI_PORT;

    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> requestAiCore(String userId, String chatId, List<ChatMessage> chatHistory) {
        String url = AI_PORT;

        List<ChatRequest.ChatHistory> history = chatHistory.stream()
            .map(msg -> ChatRequest.ChatHistory.builder()
                .role(msg.getRole())
                .parts(Arrays.asList(msg.getContent()))
                .build())
            .collect(Collectors.toList());

        ChatRequest request = ChatRequest.builder()
            .location("default")
            .history(history)
            .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<ChatRequest> entity = new HttpEntity<>(request, headers);

        return restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
    }
}
