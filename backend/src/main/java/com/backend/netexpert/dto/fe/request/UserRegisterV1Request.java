package com.backend.netexpert.dto.fe.request;

import lombok.Getter;

@Getter
public class UserRegisterV1Request {
    private String username;
    private String email;
    private String orgtype;
    private String orgname;
    private String name;
}
