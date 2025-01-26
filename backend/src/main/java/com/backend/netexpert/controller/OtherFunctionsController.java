package com.backend.netexpert.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.netexpert.dto.fe.response.ChatLimitResponse;
import com.backend.netexpert.entity.Chat;
import com.backend.netexpert.entity.ChatMessage;
import com.backend.netexpert.service.ChatMessageService;
import com.backend.netexpert.service.ChatService;

@RestController
public class OtherFunctionsController {

    @Autowired
    ChatService chatService;

    @Autowired
    ChatMessageService chatMessageService;

    @GetMapping("chats")
    List<ChatLimitResponse> getChatAndClarifyDate(@RequestParam("limit") int limit) {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        Map<String, List<ChatLimitResponse.Chats>> response = new HashMap<>();
    
        // Initialize categories in the map
        response.put("Today", new ArrayList<>());
        response.put("Yesterday", new ArrayList<>());
        response.put("This Week", new ArrayList<>());
        response.put("This Month", new ArrayList<>());
        response.put("A Long Time Ago", new ArrayList<>());
    
        // Fetch latest chat data
        List<Chat> getChat = chatService.getLatestChat(name, limit);
    
        // Iterate over chats and categorize them
        for (Chat chat : getChat) {
            String tmp = classifyDate(chat.getLastActivityAt()); // Timetitle (e.g. "Today", "Yesterday")
    
            // Get the corresponding list based on the category (e.g. "Today")
            List<ChatLimitResponse.Chats> categorizedChats = response.get(tmp);
            if (categorizedChats != null) {
                // Create a new ChatLimitResponse.Chats object
                ChatLimitResponse.Chats chatLimitResponseChats = new ChatLimitResponse.Chats();
                chatLimitResponseChats.title = "Chat: " + chat.getLastActivityAt();
                chatLimitResponseChats.id = chat.getChatId();
                chatLimitResponseChats.time = chat.getLastActivityAt();
    
                // Add the chat to the appropriate category list
                categorizedChats.add(chatLimitResponseChats);
            }
        }
    
        // Create a new list to collect all chats
        List<ChatLimitResponse> finalResponse = new ArrayList<>();
    
        // Iterate through each list in the map and add it to the final response list
        for (Map.Entry<String, List<ChatLimitResponse.Chats>> entry : response.entrySet()) {
            List<ChatLimitResponse.Chats> chatsList = entry.getValue();
            if (!chatsList.isEmpty()) {
                // Create a new ChatLimitResponse and set the timetitle and chats
                ChatLimitResponse chatLimitResponse = new ChatLimitResponse();
                chatLimitResponse.setTimetitle(entry.getKey()); // Set the timetitle like "Today", "Yesterday", etc.
                chatLimitResponse.setChats(chatsList); // Set the list of categorized chats
    
                // Add the chat category to the final response list
                finalResponse.add(chatLimitResponse);
            }
        }
    
        return finalResponse; // Return the final list containing all categorized chats
    }
    
    @GetMapping("conversations")
    ResponseEntity<?> getChatById(@RequestParam("id") String chatId, @RequestParam("limit") int limit)
    {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        List<ChatMessage> messages = chatMessageService.getLatestChatMessagesWithChatId(chatId, limit);
         
        List<Map<String, Object> > responseMessages = new ArrayList<>();

        for (ChatMessage message : messages)
        {
            Map<String, Object> tmp = new HashMap<>();
            tmp.put("from", message.getRole());
            //tmp.put("contenttype", " ")
            responseMessages.add(tmp);
        }
        return ResponseEntity.ok(response);
    }

    String classifyDate(LocalDateTime targetDateTime) {
        // Extract the date part of the LocalDateTime
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
