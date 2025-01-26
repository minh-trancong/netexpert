package com.backend.netexpert.dto.fe.request;

import lombok.Getter;

@Getter
public class UserLoginRequest {
    private String username;
    private String password;
}
