package com.smartcity.bhubaneswar.controller;

import com.smartcity.bhubaneswar.model.User;
import com.smartcity.bhubaneswar.payload.response.UserInfoResponse;
import com.smartcity.bhubaneswar.repository.UserRepository;
import com.smartcity.bhubaneswar.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserInfoResponse> userInfoResponses = users.stream()
                .map(user -> new UserInfoResponse(user.getId(), user.getUsername(), user.getName()))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(userInfoResponses);
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserProfile() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        
        UserInfoResponse userInfoResponse = new UserInfoResponse(
                user.getId(),
                user.getUsername(),
                user.getName()
        );
        
        return ResponseEntity.ok(userInfoResponse);
    }
}