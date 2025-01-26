package com.backend.netexpert.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    UNCATEGORIZED_EXCEPTION("Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED("User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED("User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED("Unauthenticated", HttpStatus.UNAUTHORIZED),
    ;

    

    private final String message;
    private final HttpStatusCode statusCode;
}
