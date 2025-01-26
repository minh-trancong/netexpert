package com.backend.netexpert.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.core.Authentication;
import com.backend.netexpert.dto.fe.request.UserLoginRequest;
import com.backend.netexpert.entity.UserAccount;
import com.backend.netexpert.entity.UserInfo;
import com.backend.netexpert.exception.AppException;
import com.backend.netexpert.exception.ErrorCode;
import com.backend.netexpert.repository.UserAccountRepository;
import com.backend.netexpert.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("test")
@Slf4j
public class TestController {
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserService userService;

    @GetMapping("get-account")
    UserAccount getByUsername(@RequestBody UserLoginRequest request)
    {   
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
        return userAccountRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    @GetMapping("get-all")
    List<UserInfo> getAllUserInfo()
    {
        return userService.getAllUserInfo();
    }
}
