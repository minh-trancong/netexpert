package com.backend.netexpert.controller;

import java.util.Arrays;
import java.util.List;

import org.aspectj.weaver.patterns.TypePatternQuestions.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.netexpert.dto.ai.request.ChatRequest;
import com.backend.netexpert.dto.fe.request.QuestionRequest;
import com.backend.netexpert.service.UserHistoryService;

@RestController

public class ChatController {

    @Autowired
    UserHistoryService userHistoryService;


    @PostMapping("question")
    void question(@RequestBody QuestionRequest request)
    {       
        // user id
        // string cau hoi
        List<String> tmp = Arrays.asList(request.getQuestion());

        userHistoryService.upsert(request.getChatId(), "user", tmp);
    }
}
