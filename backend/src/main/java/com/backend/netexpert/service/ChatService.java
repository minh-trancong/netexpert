package com.backend.netexpert.service;

import com.backend.netexpert.entity.Chat;
import com.backend.netexpert.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public Chat getOrCreateChat(String chatId, String userId) {
        Optional<Chat> existingChat = chatRepository.findById(chatId);
        if (existingChat.isPresent()) {
            return existingChat.get();
        }

        Chat newChat = Chat.builder()
            .chatId(chatId)
            .userId(userId)
            .createdAt(LocalDateTime.now())
            .lastActivityAt(LocalDateTime.now())
            .build();
        return chatRepository.save(newChat);
    }

    public void updateChatTimestamp(String chatId) {
        chatRepository.findById(chatId).ifPresent(chat -> {
            chat.setLastActivityAt(LocalDateTime.now());
            chatRepository.save(chat);
        });
    }

    public List<Chat> getLatestChat(String username, int limit)
    {
        Pageable pageable = PageRequest.of(0, limit);
        return chatRepository.findByUserIdOrderByCreatedAtDesc(username, pageable);
    }
}