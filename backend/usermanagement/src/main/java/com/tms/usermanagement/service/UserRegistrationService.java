package com.tms.usermanagement.service;

import com.tms.usermanagement.model.Role;
import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.RoleRepository;
import com.tms.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.Optional;

@Service
public class UserRegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EmailService emailService; 

    public User registerUser(String firstName, String lastName, String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("User already exists with the provided email.");
        }

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(password);  // Ensure password is hashed before saving
        user.setFullName(firstName + " " + lastName);

        // Generate email verification token (hash of the email)
        String token = DigestUtils.md5DigestAsHex(email.getBytes());
        user.setVerificationToken(token);

        Role userRole = roleRepository.findByRoleName("User");
        user.setRole(userRole);

        user.setEmailVerified(false); // Initially set emailVerified to false

        userRepository.save(user);

        // Send verification email with token
        emailService.sendVerificationEmail(email, token);

        return user;
    }

    public User registerGoogleUser(String firstName, String lastName, String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setFullName(firstName + " " + lastName); 
        user.setEmailVerified(true);  // Since Google authentication verifies the user

        Role userRole = roleRepository.findByRoleName("User");
        user.setRole(userRole);

        return userRepository.save(user);
    }
}
