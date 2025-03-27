package com.smartcity.bhubaneswar.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class ScrapbookEntryRequest {
    @NotBlank
    @Size(max = 100)
    private String title;

    @NotBlank
    private String content;

    private String imageUrl;

    private boolean isPublic;

    @Size(max = 100)
    private String location;
}