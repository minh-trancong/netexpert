package com.backend.netexpert.controller;

import com.backend.netexpert.dto.fe.request.QuestionRequest;
import com.backend.netexpert.entity.Chat;
import com.backend.netexpert.entity.ChatMessage;
import com.backend.netexpert.service.AICoreService;
import com.backend.netexpert.service.ChatMessageService;
import com.backend.netexpert.service.ChatService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private AICoreService aiCoreService;

    @PostMapping("/question")
    public ResponseEntity<String> question(@RequestBody QuestionRequest request) {
        // First ensure chat exists or create new chat
        Chat chat = chatService.getOrCreateChat(request.getChatId(), request.getUserId());

        // Save user message
        ChatMessage userMessage = ChatMessage.builder()
                .chatId(request.getChatId())
                .role("user")
                .content(request.getQuestion())
                .createdAt(LocalDateTime.now())
                .build();
        chatMessageService.save(userMessage);

        // Get AI response
        String aiResponseJson = aiCoreService.requestAiCore(
                request.getUserId(),
                request.getChatId(),
                chatMessageService.getChatHistory(request.getChatId())
        ).getBody();

        // Parse JSON response and extract the 'response' field
        ObjectMapper objectMapper = new ObjectMapper();
        String aiResponse;
        try {
            JsonNode jsonNode = objectMapper.readTree(aiResponseJson);
            aiResponse = jsonNode.get("response").asText();
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(500).body("Error processing AI response");
        }

        // Save AI response
        ChatMessage aiMessage = ChatMessage.builder()
                .chatId(request.getChatId())
                .role("model")
                .content(aiResponse)
                .createdAt(LocalDateTime.now())
                .build();
        chatMessageService.save(aiMessage);

        // Update chat's last activity time
        chatService.updateChatTimestamp(request.getChatId());

        return ResponseEntity.ok(aiResponse);
    }

    @GetMapping("/history/{chatId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable String chatId) {
        return ResponseEntity.ok(chatMessageService.getChatHistory(chatId));
    }

    @GetMapping("/history/user/{userId}")
    public ResponseEntity<List<ChatMessage>> getUserChatHistory(@PathVariable String userId) {
        return ResponseEntity.ok(chatMessageService.getUserChatHistory(userId));
    }
}