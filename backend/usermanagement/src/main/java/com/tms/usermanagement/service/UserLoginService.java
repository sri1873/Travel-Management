package com.tms.usermanagement.service;

import com.tms.usermanagement.model.Role;
import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.RoleRepository;
import com.tms.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URL;
import java.util.Optional;

@Service
public class UserLoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User loginWithGoogle(String googleToken) {
        try {
            String tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + googleToken;
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(new URL(tokenInfoUrl));

            if (node.has("error_description")) {
                throw new RuntimeException("Invalid ID token: " + node.get("error_description").asText());
            }

            String email = node.has("email") ? node.get("email").asText() : null;
            String firstName = node.has("given_name") ? node.get("given_name").asText() : "";
            String lastName = node.has("family_name") ? node.get("family_name").asText() : "";
            String fullName = node.has("name") ? node.get("name").asText() : (firstName + " " + lastName);

            if (email == null) {
                throw new RuntimeException("No email returned from Google token");
            }

            Optional<User> existingUserOpt = userRepository.findByEmail(email);
            if (existingUserOpt.isPresent()) {
                return existingUserOpt.get();
            }

            User newUser = new User();
            newUser.setEmail(email);
            newUser.setFirstName(firstName);
            newUser.setLastName(lastName);
            newUser.setFullName(fullName);
            newUser.setEmailVerified(true);
            Role userRole = roleRepository.findByRoleName("User");
            if (userRole == null) {
                userRole = new Role();
                userRole.setRoleName("User");
                roleRepository.save(userRole);
            }
            newUser.setRole(userRole);
            newUser.setPassword(""); 

            return userRepository.save(newUser);

        } catch (IOException e) {
            throw new RuntimeException("Failed to verify Google token with tokeninfo endpoint", e);
        }
    }

    public User loginWithEmailPassword(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("Invalid password.");
        }
        if (!user.getEmailVerified()) {
            throw new IllegalArgumentException("Email not verified. Please verify your email.");
        }

        return user;
    }
}
