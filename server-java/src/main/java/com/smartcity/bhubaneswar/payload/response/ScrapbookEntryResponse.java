package com.smartcity.bhubaneswar.payload.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ScrapbookEntryResponse {
    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private LocalDateTime createdAt;
    private boolean isPublic;
    private String location;
    private UserInfoResponse user;
}