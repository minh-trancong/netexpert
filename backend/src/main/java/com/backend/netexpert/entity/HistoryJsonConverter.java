package com.backend.netexpert.entity;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Component
@Converter
public class HistoryJsonConverter implements AttributeConverter<UserHistory.History, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(UserHistory.History history) {
        try {
            return objectMapper.writeValueAsString(history);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert history object to JSON", e);
        }
    }

    @Override
    public UserHistory.History convertToEntityAttribute(String historyJson) {
        try {
            return objectMapper.readValue(historyJson, UserHistory.History.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert history object to JSON", e);
        }
    }
}