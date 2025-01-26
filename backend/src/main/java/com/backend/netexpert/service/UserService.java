package com.backend.netexpert.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.netexpert.dto.fe.request.UserLoginRequest;
import com.backend.netexpert.dto.fe.request.UserRegisterV1Request;
import com.backend.netexpert.dto.fe.request.UserRegisterV2Request;
import com.backend.netexpert.dto.fe.response.UserLoginResponse;
import com.backend.netexpert.dto.fe.response.UserRegisterResponse;
import com.backend.netexpert.entity.*;

import com.backend.netexpert.enums.Role;
import com.backend.netexpert.exception.*;

import com.backend.netexpert.repository.*;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.KeyLengthException;

@Service
public class UserService {

    @Autowired
    private UserAccountRepository userAccountRepository; // user_account 
    @Autowired
    private UserInfoRepository userInfoRepository; //user_info

    @Autowired
    PasswordEncoder passwordEncoder;
    private AuthenService authenService;


    public UserService(UserAccountRepository userAccountRepository, UserInfoRepository userInfoRepository, AuthenService authenService) {
        this.userAccountRepository = userAccountRepository;
        this.userInfoRepository = userInfoRepository;
        this.authenService = authenService;
    }

    

    //Register function - Will update to authorize by emails (Later)

    public UserRegisterResponse PreRegisterRequest(UserRegisterV1Request request)
    {   
        if (userAccountRepository.existsByUsername(request.getUsername())) // check if user existed in database
        {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        return UserRegisterResponse.builder().message("First checkpoint OK").build();
    }
    public UserRegisterResponse FinalRegisterRequest(UserRegisterV2Request request) // Register Request
    {       
        if (userAccountRepository.existsByUsername(request.getUsername())) // check if user existed in database
        {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        UserAccount userAccount = UserAccount.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword())) // encode password 
            .role(Role.customer.name())
            .build();

        userAccountRepository.save(userAccount);    //save username, password to user_account

        UserInfo userInfo = UserInfo.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .orgtype(request.getOrgtype())
            .orgname(request.getOrgname())
            .name(request.getName())
            .build();

        userInfoRepository.save(userInfo);  //save personal info in user_info

        return UserRegisterResponse.builder().message("Successfully registered").build();
    }

    //Login function - Return token and basic infos
    public UserLoginResponse loginRequest(UserLoginRequest request) throws KeyLengthException, JOSEException
    {   
        // check if username existed in db
        UserAccount userAccount = userAccountRepository.findByUsername(request.getUsername())
                                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        
        //check if the password matched
        System.out.println(request.getPassword());

        boolean authenticated = passwordEncoder.matches(request.getPassword(), userAccount.getPassword()); // Hash passwords here later
        if (!authenticated)
        {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return UserLoginResponse.builder()
            .token(authenService.generateToken(userAccount))
            .user(UserLoginResponse.UserLoginDetailResponse.builder()
                .user_id(userAccount.getUser_id())
                .username(userAccount.getUsername())
                .role(userAccount.getRole())
                .build())
            .build();
    } 


    //Get all data from database - Must have admin's token
    @PreAuthorize("hasRole('admin')")
    public List<UserInfo> getAllUserInfo()
    {
        return userInfoRepository.findAll();
    }

    //Get info - Use valid token to get info
    public UserInfo getMyInfo()
    {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName(); // Get name from token ("sub" in building JWT)

        UserInfo user = userInfoRepository.findByUsername(name).orElseThrow(
            () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        return user;
    }
}
