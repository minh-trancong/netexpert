package com.backend.netexpert.repository;

import com.backend.netexpert.entity.Chat;
import com.backend.netexpert.entity.ChatMessage;

import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, String> {
    Optional<Chat> findByChatIdAndUserId(String chatId, String userId);
    Optional<Chat> findByChatId(String chatId);

    List<Chat> findByUserIdOrderByCreatedAtDesc(String userId, Pageable pageable);

}