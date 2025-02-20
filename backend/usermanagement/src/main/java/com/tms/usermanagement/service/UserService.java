package com.tms.usermanagement.service;

import com.tms.usermanagement.model.Role;
import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.RoleRepository;
import com.tms.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;



    public User registerUser(User user) {
        // Check if email or username already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already taken");
        }

        // Set the default user role 
        Role userRole = roleRepository.findByRoleName("User"); 
        user.setRole(userRole);

        // Save the user in the database
        User savedUser = userRepository.save(user);


        return savedUser;
    }
}
