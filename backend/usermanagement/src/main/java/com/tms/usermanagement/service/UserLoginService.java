package com.tms.usermanagement.service;

import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.UserRepository;
import com.tms.usermanagement.repository.RoleRepository;
import com.tms.usermanagement.model.Role;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
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
            // Parse the Google token using Gson
            Gson gson = new Gson();
            JsonObject payload = gson.fromJson(googleToken, JsonObject.class);

            String email = payload.get("email").getAsString(); // Get email from the payload

            Optional<User> existingUser = userRepository.findByEmail(email);
            if (existingUser.isPresent()) {
                return existingUser.get();  // Return existing user if found
            } else {
                // Create a new user if not found
                User user = new User();
                user.setEmail(email);
                user.setFirstName(payload.get("given_name").getAsString());
                user.setLastName(payload.get("family_name").getAsString());
                user.setFullName(payload.get("name").getAsString());
                user.setEmailVerified(true);  // Google users are generally verified

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
        try {
            // Decode and verify the JWT token
            Claims claims = Jwts.parser()
                .setSigningKey("your-secret-key")  // Same secret used during token generation
                .parseClaimsJws(token)
                .getBody();

            String email = claims.getSubject();  // Get the email from the token claims

            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                User verifiedUser = user.get();
                verifiedUser.setEmailVerified(true); // Mark the user as verified
                userRepository.save(verifiedUser);
                return verifiedUser;
            } else {
                throw new IllegalArgumentException("Invalid verification token.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Token verification failed", e);
        }
    }
}
