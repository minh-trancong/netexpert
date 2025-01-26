package com.backend.netexpert.controller;

import com.backend.netexpert.dto.fe.request.QuestionRequest;
import com.backend.netexpert.dto.fe.response.AIChatResponse;
import com.backend.netexpert.dto.fe.response.AIChatResponse.Network;
import com.backend.netexpert.entity.Chat;
import com.backend.netexpert.entity.ChatMessage;
import com.backend.netexpert.service.AICoreService;
import com.backend.netexpert.service.AuthenService;
import com.backend.netexpert.service.ChatMessageService;
import com.backend.netexpert.service.ChatService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.Authenticator;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private AICoreService aiCoreService;

    @Autowired
    AuthenService authenService;

    @PostMapping("/conversation")
    ResponseEntity<Map<String, Object > > createChatId()
    {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        String chatId = authenService.generateRandomString(10);

        chatService.getOrCreateChat(chatId, name);
        Map<String, Object> tmp = new HashMap<>();
        tmp.put("status", "success");
        tmp.put("chatId", chatId);
        return ResponseEntity.ok(tmp);
    }

    @PostMapping("/question")
    
    public ResponseEntity<?> question(@RequestBody QuestionRequest request) throws JsonProcessingException {

        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName(); // Get name from token ("sub" in building JWT)

        // First ensure chat exists or create new chat

        Chat chat = chatService.getOrCreateChat(request.getChatId(), name);

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
                name,
                request.getChatId(),
                chatMessageService.getLatestChatMessagesWithChatId(request.getChatId(), 11) /// Change to 11 latest chat here
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

        System.out.println(aiResponseJson);

        AIChatResponse aiChatResponse = new AIChatResponse();
        try {
            aiChatResponse = objectMapper.readValue(aiResponseJson, AIChatResponse.class);
        } catch (JsonProcessingException e) {

            //System.out.println("Loi mapper");
            return ResponseEntity.status(500).body("Error processing AI response");
        }

        //return ResponseEntity.status(200).body(aiResponseJson);
        //return ResponseEntity.ok(objectMapper.writeValueAsString(aiChatResponse));

        return handleAIChatResponse(aiChatResponse);
    }

    @GetMapping("/history/{chatId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable String chatId) {
        return ResponseEntity.ok(chatMessageService.getChatHistory(chatId));
    }

    @GetMapping("/history/user/{userId}")
    public ResponseEntity<List<ChatMessage>> getUserChatHistory(@PathVariable String userId) {
        return ResponseEntity.ok(chatMessageService.getUserChatHistory(userId));
    }
    
    ResponseEntity<Map<String, Object> > handleAIChatResponse(AIChatResponse aiChatResponse)
    {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        List<Map<String, Object> > listMessages = new ArrayList<>();
        if (aiChatResponse.networks.isEmpty())
        {
            Map<String, Object> tmp = new HashMap<>();
            tmp.put("from", "bot");
            tmp.put("contenttype", "markdown");
            tmp.put("content", aiChatResponse.response);

            listMessages.add(tmp);
        }
        else 
        {
            for (Network network : aiChatResponse.networks)
            {
                Map<String, Object> tmp = new HashMap<>();  
                tmp.put("from", "bot");
                tmp.put("contenttype", "graph");
                tmp.put("content", network);
                listMessages.add(tmp);
            }
        }
        response.put("messages", listMessages);

        return ResponseEntity.ok(response);
    }

    String classifyDate(String dateString)
    {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");
        
        // Parse the date string into a LocalDateTime object
        LocalDateTime targetDateTime = LocalDateTime.parse(dateString, formatter);
        LocalDate targetDate = targetDateTime.toLocalDate();
        
        // Get the current date
        LocalDate today = LocalDate.now();
        
        // Determine the category
        if (targetDate.isEqual(today)) {
            return "Today";
        } else if (targetDate.isEqual(today.minusDays(1))) {
            return "Yesterday";
        } else if (targetDate.isAfter(today.minusDays(today.getDayOfWeek().getValue()))) {
            return "This Week";
        } else if (targetDate.getYear() == today.getYear() && targetDate.getMonth() == today.getMonth()) {
            return "This Month";
        } else {
            return "A Long Time Ago";
        }
    }


}