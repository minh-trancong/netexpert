package com.backend.netexpert.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    //Unexpected Error
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<String> handlingRuntimeException(RuntimeException exception) {
        return ResponseEntity.badRequest().body(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
    }

    //Defined Error
    @ExceptionHandler (value = RuntimeException.class)
    ResponseEntity<String> handlinAppException (AppException exception)
    {   
        ErrorCode errorCode = exception.getErrorCode();
        return ResponseEntity.status(errorCode.getStatusCode()).body(errorCode.getMessage());
    }
}
