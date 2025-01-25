package com.backend.netexpert.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.backend.netexpert.entity.UserHistory.History;
import com.backend.netexpert.repository.UserHistoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class UserHistoryService {

    @Autowired
    private UserHistoryRepository userHistoryRepository;


    public void upsert(String chatId, String role, List<String> parts)
    {   
        History currenHistory = History.builder()
            .role(role)
            .parts(parts)
            .build();
        String currentHistoryJson = convertHistoryToJson(currenHistory);
        System.err.println(currentHistoryJson);
        userHistoryRepository.upsertHistory(chatId, currentHistoryJson);
    }

    private String convertHistoryToJson(History history) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(history);
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert History to JSON", e);
        }
    }
}
