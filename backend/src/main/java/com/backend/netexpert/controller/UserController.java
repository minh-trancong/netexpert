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

    @PostMapping("register/1")
    UserRegisterResponse PreRegisterRequest(@RequestBody UserRegisterV1Request userRegisterRequest)
    {   
        return userService.PreRegisterRequest(userRegisterRequest);
    }

    @PostMapping("register/2")
    UserRegisterResponse FinalRegisterUser(@RequestBody UserRegisterV2Request userRegisterRequest)
    {   
        return userService.FinalRegisterRequest(userRegisterRequest);
    }

    @PostMapping("login")
    UserLoginResponse loginUser(@RequestBody UserLoginRequest userLoginRequest) throws KeyLengthException, JOSEException
    {   
        System.out.println(userLoginRequest.getPassword());
        return userService.loginRequest(userLoginRequest);
    }

    @GetMapping("/my-profile")
    UserInfo getMyInfo()
    {
        return userService.getMyInfo();
    }
}
