package com.smartcity.bhubaneswar.controller;

import com.smartcity.bhubaneswar.model.ScrapbookEntry;
import com.smartcity.bhubaneswar.model.User;
import com.smartcity.bhubaneswar.payload.request.ScrapbookEntryRequest;
import com.smartcity.bhubaneswar.payload.response.MessageResponse;
import com.smartcity.bhubaneswar.payload.response.ScrapbookEntryResponse;
import com.smartcity.bhubaneswar.payload.response.UserInfoResponse;
import com.smartcity.bhubaneswar.repository.ScrapbookEntryRepository;
import com.smartcity.bhubaneswar.repository.UserRepository;
import com.smartcity.bhubaneswar.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/scrapbook")
public class ScrapbookController {
    @Autowired
    ScrapbookEntryRepository scrapbookEntryRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserEntries() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("Error: User not found."));
        
        List<ScrapbookEntry> entries = scrapbookEntryRepository.findByUser(user);
        List<ScrapbookEntryResponse> responseEntries = mapToScrapbookEntryResponse(entries);
        
        return ResponseEntity.ok(responseEntries);
    }

    @GetMapping("/public")
    public ResponseEntity<?> getPublicEntries() {
        List<ScrapbookEntry> entries = scrapbookEntryRepository.findByIsPublicTrue();
        List<ScrapbookEntryResponse> responseEntries = mapToScrapbookEntryResponse(entries);
        
        return ResponseEntity.ok(responseEntries);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createEntry(@Valid @RequestBody ScrapbookEntryRequest scrapbookEntryRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("Error: User not found."));
        
        ScrapbookEntry scrapbookEntry = new ScrapbookEntry();
        scrapbookEntry.setTitle(scrapbookEntryRequest.getTitle());
        scrapbookEntry.setContent(scrapbookEntryRequest.getContent());
        scrapbookEntry.setImageUrl(scrapbookEntryRequest.getImageUrl());
        scrapbookEntry.setPublic(scrapbookEntryRequest.isPublic());
        scrapbookEntry.setLocation(scrapbookEntryRequest.getLocation());
        scrapbookEntry.setUser(user);
        
        scrapbookEntryRepository.save(scrapbookEntry);
        
        return ResponseEntity.ok(new MessageResponse("Entry created successfully!"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getEntry(@PathVariable Long id) {
        ScrapbookEntry entry = scrapbookEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Entry not found."));
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        if (!entry.isPublic() && !entry.getUser().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(new MessageResponse("Error: You don't have permission to view this entry."));
        }
        
        ScrapbookEntryResponse entryResponse = mapToScrapbookEntryResponse(entry);
        
        return ResponseEntity.ok(entryResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteEntry(@PathVariable Long id) {
        ScrapbookEntry entry = scrapbookEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Entry not found."));
        
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        if (!entry.getUser().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(new MessageResponse("Error: You don't have permission to delete this entry."));
        }
        
        scrapbookEntryRepository.delete(entry);
        
        return ResponseEntity.ok(new MessageResponse("Entry deleted successfully!"));
    }

    private List<ScrapbookEntryResponse> mapToScrapbookEntryResponse(List<ScrapbookEntry> entries) {
        return entries.stream().map(this::mapToScrapbookEntryResponse).collect(Collectors.toList());
    }

    private ScrapbookEntryResponse mapToScrapbookEntryResponse(ScrapbookEntry entry) {
        ScrapbookEntryResponse response = new ScrapbookEntryResponse();
        response.setId(entry.getId());
        response.setTitle(entry.getTitle());
        response.setContent(entry.getContent());
        response.setImageUrl(entry.getImageUrl());
        response.setCreatedAt(entry.getCreatedAt());
        response.setPublic(entry.isPublic());
        response.setLocation(entry.getLocation());
        
        User user = entry.getUser();
        response.setUser(new UserInfoResponse(user.getId(), user.getUsername(), user.getName()));
        
        return response;
    }
}