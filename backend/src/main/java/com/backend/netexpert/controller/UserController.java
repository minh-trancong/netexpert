package com.backend.netexpert.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.netexpert.dto.fe.request.*;
import com.backend.netexpert.dto.fe.response.*;
import com.backend.netexpert.entity.UserInfo;
import com.backend.netexpert.service.UserService;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.KeyLengthException;

@RestController
@RequestMapping("auth")
public class UserController {
    @Autowired

    private UserService userService;

    @PostMapping("register")
    UserRegisterResponse registerUser(@RequestBody UserRegisterRequest userRegisterRequest)
    {   
        return userService.registerRequest(userRegisterRequest);
    }

    @PostMapping("login")
    UserLoginResponse loginUser(@RequestBody UserLoginRequest userLoginRequest) throws KeyLengthException, JOSEException
    {   
        return userService.loginRequest(userLoginRequest);
    }

    @GetMapping("/my-profile")
    UserInfo getMyInfo()
    {
        return userService.getMyInfo();
    }
}
