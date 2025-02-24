package com.tms.usermanagement.controller;

import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.UserRepository;
import com.tms.usermanagement.service.UserRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.tms.usermanagement.service.UserLoginService;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRegistrationService userRegistrationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserLoginService userLoginService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        System.out.println("Received user: " + user.toString());  
    
        if (user.getPassword() == null || !user.getPassword().equals(user.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Password and Confirm Password must match.");
        }
    
        try {
            userRegistrationService.registerUser(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());
            return ResponseEntity.ok("User registered successfully. Please check your email for verification.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        Optional<User> user = userRepository.findByVerificationToken(token);

        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid verification token.");
        }

        User verifiedUser = user.get();
        verifiedUser.setEmailVerified(true);
        userRepository.save(verifiedUser);

        return ResponseEntity.ok("Email verified successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
        try {
            // Attempt to login using email and password
            User user = userLoginService.loginWithEmailPassword(loginRequest.getEmail(), loginRequest.getPassword());

            // Check if the email is verified
            if (!user.getEmailVerified()) {
                return ResponseEntity.badRequest().body("Email not verified. Please verify your email.");
            }

            // If login is successful, return a success message or token for session management
            return ResponseEntity.ok("Login successful. Redirecting to dashboard...");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body("Invalid email or password.");
        }
    }
}
