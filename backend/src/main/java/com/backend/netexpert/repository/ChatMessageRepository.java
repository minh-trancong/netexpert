package com.backend.netexpert.repository;

import com.backend.netexpert.entity.ChatMessage;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    List<ChatMessage> findByChatIdOrderByCreatedAtAsc(String chatId);
    List<ChatMessage> findByChatIdAndRoleOrderByCreatedAtAsc(String chatId, String role);
    List<ChatMessage> findByChat_UserIdOrderByCreatedAtDesc(String userId);

    List<ChatMessage> findTopByChatIdOrderByCreatedAtDesc(String chatId, Pageable pageable);
    List<ChatMessage> findAllByOrderByCreatedAtDesc(Pageable pageable);

    
}
