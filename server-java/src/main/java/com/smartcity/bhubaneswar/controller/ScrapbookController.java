package com.smartcity.bhubaneswar.controller;

import com.smartcity.bhubaneswar.model.ScrapbookEntry;
import com.smartcity.bhubaneswar.model.User;
import com.smartcity.bhubaneswar.payload.response.MessageResponse;
import com.smartcity.bhubaneswar.repository.ScrapbookEntryRepository;
import com.smartcity.bhubaneswar.repository.UserRepository;
import com.smartcity.bhubaneswar.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/scrapbook")
public class ScrapbookController {
    @Autowired
    private ScrapbookEntryRepository scrapbookEntryRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/entries")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserEntries() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        List<ScrapbookEntry> entries = scrapbookEntryRepository.findByUserOrderByCreatedAtDesc(user);
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/public")
    public ResponseEntity<?> getPublicEntries() {
        List<ScrapbookEntry> entries = scrapbookEntryRepository.findByIsPublicTrueOrderByCreatedAtDesc();
        return ResponseEntity.ok(entries);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createEntry(@Valid @RequestBody ScrapbookEntry entryRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        ScrapbookEntry entry = new ScrapbookEntry();
        entry.setTitle(entryRequest.getTitle());
        entry.setContent(entryRequest.getContent());
        entry.setImageUrl(entryRequest.getImageUrl());
        entry.setLocation(entryRequest.getLocation());
        entry.setPublic(entryRequest.isPublic());
        entry.setUser(user);

        scrapbookEntryRepository.save(entry);
        return ResponseEntity.ok(new MessageResponse("Entry created successfully!"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getEntryById(@PathVariable Long id) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        ScrapbookEntry entry = scrapbookEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Entry not found."));
        
        // Check if entry is public or belongs to current user
        if (entry.isPublic() || entry.getUser().getId().equals(userDetails.getId())) {
            return ResponseEntity.ok(entry);
        } else {
            return ResponseEntity.status(403).body(new MessageResponse("Error: You don't have permission to view this entry."));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteEntry(@PathVariable Long id) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        ScrapbookEntry entry = scrapbookEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Entry not found."));
        
        // Check if entry belongs to current user or user is admin
        if (entry.getUser().getId().equals(userDetails.getId()) || 
                userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            scrapbookEntryRepository.delete(entry);
            return ResponseEntity.ok(new MessageResponse("Entry deleted successfully!"));
        } else {
            return ResponseEntity.status(403).body(new MessageResponse("Error: You don't have permission to delete this entry."));
        }
    }
}