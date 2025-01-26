package com.backend.netexpert.dto.fe.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@JsonInclude(JsonInclude.Include.NON_NULL) // All null keys will not exist in the final response

public class ApiResponse<T> {
    private int code;

    private String message;
    private T result;
}
