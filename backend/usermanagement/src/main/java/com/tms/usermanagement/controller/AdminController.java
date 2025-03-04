    package com.tms.usermanagement.controller;

    import com.tms.usermanagement.model.User;
    import com.tms.usermanagement.repository.UserRepository;
    import com.tms.usermanagement.service.AdminService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.access.prepost.PreAuthorize;
    import org.springframework.web.bind.annotation.*;
    import java.util.List;

    @RestController
    @RequestMapping("/api/admin")
    public class AdminController {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private AdminService adminService;

        @PreAuthorize("hasAuthority('Admin')")
        @GetMapping("/dashboard")
        public ResponseEntity<String> getAdminDashboard() {
            return ResponseEntity.ok("Welcome to the Admin Dashboard!");
        }

        @PreAuthorize("hasAuthority('Admin')")
        @GetMapping("/users")
        public ResponseEntity<List<User>> getAllUsers() {
            List<User> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        }

        @PreAuthorize("hasAuthority('Admin')")
        @DeleteMapping("/users/{userId}")
        public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
            adminService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully!");
        }
    }
