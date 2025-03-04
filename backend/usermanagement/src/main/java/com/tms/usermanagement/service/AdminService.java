package com.tms.usermanagement.service;

import com.tms.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
