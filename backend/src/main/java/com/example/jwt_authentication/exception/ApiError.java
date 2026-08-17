package com.example.jwt_authentication.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiError {
    private int status;
    private String error;
    private String message;
}
