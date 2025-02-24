package com.tms.usermanagement.service;

import com.tms.usermanagement.model.Role;
import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.RoleRepository;
import com.tms.usermanagement.repository.UserRepository;

import jakarta.transaction.Transactional;

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

    @Transactional
    public User registerUser(String firstName, String lastName, String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("User already exists with the provided email.");
        }

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(password);  
        user.setFullName(firstName + " " + lastName);

        
        String token = DigestUtils.md5DigestAsHex(email.getBytes());
        user.setVerificationToken(token);


        System.out.println("Fetching role 'User' from the database...");
        Role userRole = roleRepository.findByRoleName("User");
        if (userRole == null) {
            userRole = new Role();
            userRole.setRoleName("User");
            roleRepository.save(userRole);
            System.out.println("Role 'User' created and saved.");
        } else {
            System.out.println("Successfully fetched 'User' role: " + userRole.getRoleName());
        }
        
        user.setEmailVerified(false); 
        userRepository.save(user);
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
        user.setEmailVerified(true);  // Automatically mark as verified for Google users

        Role userRole = roleRepository.findByRoleName("User");
        if (userRole == null) {
            throw new RuntimeException("Role 'User' not found.");
        }
        user.setRole(userRole);

        return userRepository.save(user);
    }
}
