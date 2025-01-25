package com.backend.netexpert.dto.fe.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@Data
public class AuthenticationResponse {
    private String token;
    boolean authenticated;
}
