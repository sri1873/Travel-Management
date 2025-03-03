package com.tms.usermanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers(
                    "/api/users/register",
                    "/api/users/login",
                    "/api/users/login/google",   
                    "/oauth2/authorization/google",
                    "/api/users/verify-email"
                ).permitAll()
                
                .anyRequest().authenticated()
            )
            
            .oauth2Login(Customizer.withDefaults());

        return http.build();
    }
}
