package com.backend.netexpert.dto.fe.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserLoginResponse {
    private String token;
    UserLoginDetailResponse user;

    @Data
    @Builder
    public static class UserLoginDetailResponse {
        private int user_id;
        private String username;
        private String role;
    }
}
