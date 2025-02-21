package com.tms.usermanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())  
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/users/register", "/oauth2/authorization/google").permitAll()
                .anyRequest().authenticated()  
            )
            .oauth2Login(Customizer.withDefaults());  
        return http.build();
    }
}
