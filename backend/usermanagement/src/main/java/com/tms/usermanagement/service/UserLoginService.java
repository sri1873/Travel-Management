package com.tms.usermanagement.service;

import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserLoginService {

    @Autowired
    private UserRepository userRepository;

    // Remove BCryptPasswordEncoder since password hashing isn't implemented yet
    // private BCryptPasswordEncoder passwordEncoder;

    public User loginWithEmailPassword(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Simplify password comparison for now
        if (!password.equals(user.getPassword())) {
            throw new IllegalArgumentException("Invalid password.");
        }

        return user;  // Return the user if login is successful
    }

    public User loginWithGoogle(String googleToken) {
        // Logic to verify the Google token and get user information
        // You'll need to integrate Google OAuth validation logic here

        // For now, returning a dummy user since actual token validation is outside the scope
        return new User(); // Return the user after successful Google OAuth validation
    }
}