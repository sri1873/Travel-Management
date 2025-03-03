package com.tms.usermanagement.service;

import com.tms.usermanagement.model.Role;
import com.tms.usermanagement.model.User;
import com.tms.usermanagement.repository.RoleRepository;
import com.tms.usermanagement.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.Date;
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
            userRepository.delete(existingUser.get());
        }

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(password);
        user.setFullName(firstName + " " + lastName);

        String token = generateEmailVerificationToken(email);
        user.setVerificationToken(token);

        Role userRole = roleRepository.findByRoleName("User");
        if (userRole == null) {
            userRole = new Role();
            userRole.setRoleName("User");
            roleRepository.save(userRole);
        }
        user.setEmailVerified(false);
        user.setRole(userRole);

        userRepository.save(user);

        emailService.sendVerificationEmail(email, token);

        return user;
    }

    private String generateEmailVerificationToken(String email) {
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiry
            .signWith(SignatureAlgorithm.HS512, "your-secret-key")
            .compact();
    }
}
