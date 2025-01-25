package com.backend.netexpert.config;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final String[] PUBLIC_ENPOINTS = {
        "/auth/register", "/auth/login"
    };

    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        
        httpSecurity.authorizeHttpRequests(request -> 
            request.requestMatchers(HttpMethod.POST, PUBLIC_ENPOINTS).permitAll()
                    .requestMatchers(HttpMethod.GET, PUBLIC_ENPOINTS).permitAll()
            
                    
            .anyRequest().authenticated()
        ); // Set up that the PUBLIC ENDPOINTS is public. Others must have valid token or else -> Unauthorized

        httpSecurity.oauth2ResourceServer(oath2 -> 
            oath2.jwt(jwtConfigurer -> 
                jwtConfigurer.decoder(jwtDecoder())
                    .jwtAuthenticationConverter(jwtAuthenticationConverter()))
        ); //Change the "scope" to "role" in JWT
        
        
        httpSecurity.csrf(AbstractHttpConfigurer::disable); // Turn off cross-site protection, because used JWT for authentication

        return httpSecurity.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter()
    {   
        //Set prefix "SCOPE" to "ROLE" 
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }
    @Bean 
    JwtDecoder jwtDecoder()
    {   
        //Set up JWT with local SIGNER_KEY
        SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");
        return NimbusJwtDecoder
            .withSecretKey(secretKeySpec)
            .macAlgorithm(MacAlgorithm.HS512)
            .build()
            ;
    }

    @Bean
    PasswordEncoder passwordEncoder()
    {   
        //Set up password encoder - Use the same strength (10 here)
        return new BCryptPasswordEncoder(10);
    }

    
}
