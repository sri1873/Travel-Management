package com.tms.usermanagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:8080")  // Frontend URL + Backend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");

        // Allow OAuth2 redirect URI callback
        registry.addMapping("/oauth2/**")
                .allowedOrigins("http://localhost:5173") // Adjust this to your frontend URL
                .allowedMethods("GET", "POST", "OPTIONS");
    }
}

