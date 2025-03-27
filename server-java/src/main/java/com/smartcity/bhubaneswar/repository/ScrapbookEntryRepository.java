package com.smartcity.bhubaneswar.repository;

import com.smartcity.bhubaneswar.model.ScrapbookEntry;
import com.smartcity.bhubaneswar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScrapbookEntryRepository extends JpaRepository<ScrapbookEntry, Long> {
    List<ScrapbookEntry> findByUserOrderByCreatedAtDesc(User user);
    List<ScrapbookEntry> findByIsPublicTrueOrderByCreatedAtDesc();
}