package com.tms.usermanagement.controller;

import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.UserRepository;
import com.tms.usermanagement.service.UserRegistrationService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/login/google")
    public ResponseEntity<String> loginWithGoogle(@RequestBody String googleToken) {
        try {
            User user = userLoginService.loginWithGoogle(googleToken);
            return ResponseEntity.ok("Google login successful. Welcome, " + user.getFirstName());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Google login failed: " + e.getMessage());
        }
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        try {
            System.out.println("Received token: " + token);  
            Claims claims = Jwts.parser()
                .setSigningKey("your-secret-key")  
                .parseClaimsJws(token)
                .getBody();

            String email = claims.getSubject();  
            System.out.println("Decoded email: " + email);  

            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                User verifiedUser = user.get();
                verifiedUser.setEmailVerified(true);
                userRepository.save(verifiedUser); 
                return ResponseEntity.ok("Email verified successfully!");
            } else {
                throw new IllegalArgumentException("Invalid verification token.");
            }
        } catch (Exception e) {
            e.printStackTrace();  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email verification failed: " + e.getMessage());
        }
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
        }  
        }
    }
