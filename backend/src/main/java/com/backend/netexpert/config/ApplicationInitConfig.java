package com.backend.netexpert.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import com.backend.netexpert.entity.HistoryJsonConverter;
import com.backend.netexpert.entity.UserAccount;
import com.backend.netexpert.enums.Role;
import com.backend.netexpert.repository.UserAccountRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class ApplicationInitConfig {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserAccountRepository userAccountRepository)
    {   
        //Create admin account if not existed
        return arg -> 
        {
            if (userAccountRepository.findByUsername("admin").isEmpty())
            {
                 UserAccount user = UserAccount.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .role(Role.admin.name())
                    .build();
                userAccountRepository.save(user);
                log.warn("admin account has been created");
            }
        };
    }

    @Bean
    RestTemplate restTemplate() {
        //Set up RestTemplate 
        return new RestTemplate();
    }

}
