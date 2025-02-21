package com.tms.usermanagement.service;

import com.tms.usermanagement.model.Role;
import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.RoleRepository;
import com.tms.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserRegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    
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
        
        Role userRole = roleRepository.findByRoleName("User");
        user.setRole(userRole);

        return userRepository.save(user);
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
        user.setEmailVerified(true);  
        
        Role userRole = roleRepository.findByRoleName("User");
        user.setRole(userRole);

        return userRepository.save(user);
    }
}