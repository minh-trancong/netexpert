package com.backend.netexpert.service;

import com.backend.netexpert.entity.ChatMessage;
import com.backend.netexpert.repository.ChatMessageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public int size()
    {
        return (int) chatMessageRepository.count();
    }
    public ChatMessage save(ChatMessage chatMessage) {
        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getChatHistory(String chatId) {
        return chatMessageRepository.findByChatIdOrderByCreatedAtAsc(chatId);
    }

    public List<ChatMessage> getUserMessages(String chatId) {
        return chatMessageRepository.findByChatIdAndRoleOrderByCreatedAtAsc(chatId, "user");
    }

    public List<ChatMessage> getModelMessages(String chatId) {
        return chatMessageRepository.findByChatIdAndRoleOrderByCreatedAtAsc(chatId, "model");
    }

    public List<ChatMessage> getUserChatHistory(String userId) {
        return chatMessageRepository.findByChat_UserIdOrderByCreatedAtDesc(userId);
    }

    public List<ChatMessage> getLatestChatMessagesWithChatId(String chatId, int amount) {
        Pageable pageable = PageRequest.of(0, amount); // Create a Pageable with the specified 'amount'
        return chatMessageRepository.findTopByChatIdOrderByCreatedAtDesc(chatId, pageable);
    }

    public List<ChatMessage> getLatestChatMessages(int limit) {
        Pageable pageable = PageRequest.of(0, limit); // Create a Pageable with the specified 'amount'
        return chatMessageRepository.findAllByOrderByCreatedAtDesc(pageable);
    }
}
