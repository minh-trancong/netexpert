package com.backend.netexpert.dto.fe.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Data
public class UserRegisterResponse {
    private String message;
}
