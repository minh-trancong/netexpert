package com.backend.netexpert.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.backend.netexpert.dto.ai.request.ChatRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

@Service
public class AICoreService {
    @Autowired
    private UserService userService;

    @Value("${local.AI_HTTP}")
    protected String AI_PORT;

    RestTemplate restTemplate;
}
