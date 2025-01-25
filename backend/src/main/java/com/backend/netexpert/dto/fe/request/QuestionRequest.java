package com.backend.netexpert.dto.fe.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class QuestionRequest {
    private String question;
    private String chatId;
}
