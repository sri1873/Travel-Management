package com.tms.usermanagement.service;

import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.UserRepository;
import com.tms.usermanagement.repository.RoleRepository;
import com.tms.usermanagement.model.Role;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserLoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User loginWithEmailPassword(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (!password.equals(user.getPassword())) {
            throw new IllegalArgumentException("Invalid password.");
        }
        if (!user.getEmailVerified()) {
            throw new IllegalArgumentException("Email not verified. Please verify your email.");
        }

        return user; 
    }

    public User loginWithGoogle(String googleToken) {
        try {
            String googleClientId = "DONTCOMMIT";  

            JsonFactory factory = JsonFactory.class();
            GoogleIdToken googleIdToken = GoogleIdToken.parse(factory, googleToken);

            GoogleIdToken.Payload payload = googleIdToken.getPayload();
            String email = payload.getEmail();
            Optional<User> existingUser = userRepository.findByEmail(email);
            if (existingUser.isPresent()) {
                return existingUser.get(); 
            } else {
                User user = new User();
                user.setEmail(email);
                user.setFirstName((String) payload.get("given_name"));
                user.setLastName((String) payload.get("family_name"));
                user.setFullName((String) payload.get("name"));
                user.setEmailVerified(true);  

                Role userRole = roleRepository.findByRoleName("User");
                if (userRole == null) {
                    userRole = new Role();  
                    userRole.setRoleName("User");
                    roleRepository.save(userRole);  
                }
                user.setRole(userRole);
                return userRepository.save(user);
            }

        } catch (Exception e) {
            throw new RuntimeException("Google token verification failed", e);
        }
    }

    public User verifyEmail(String token) {
        Optional<User> user = userRepository.findByVerificationToken(token);

        if (user.isEmpty()) {
            throw new IllegalArgumentException("Invalid verification token.");
        }

        User verifiedUser = user.get();
        verifiedUser.setEmailVerified(true);
        userRepository.save(verifiedUser);
        return verifiedUser;  
    }
}