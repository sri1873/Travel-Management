package com.tms.flightmanagement.authentication;

import com.tms.flightmanagement.authentication.model.AuthRequest;
import com.tms.flightmanagement.authentication.service.JwtService;
import com.tms.flightmanagement.authentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
//        try {
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
//            );

            UserDetails user = userService.loadUserByUsername(request.getUsername());
            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(token);

//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
//        }
    }

}
