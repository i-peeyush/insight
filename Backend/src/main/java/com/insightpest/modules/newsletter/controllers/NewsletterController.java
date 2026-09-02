package com.insightpest.modules.newsletter.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.newsletter.dto.NewsletterRequest;
import com.insightpest.modules.newsletter.dto.NewsletterResponse;
import com.insightpest.modules.newsletter.services.NewsletterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/newsletter")
@Tag(name = "Newsletter", description = "Endpoints for seasonal pest prevention advisories and email subscriptions")
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @PostMapping("/subscribe")
    @Operation(summary = "Subscribe an email address to seasonal pest bulletins")
    public ResponseEntity<ApiResponse<NewsletterResponse>> subscribe(
            @Valid @RequestBody NewsletterRequest request) {
        NewsletterResponse response = newsletterService.subscribe(request);
        return new ResponseEntity<>(
                ApiResponse.success("Thank you for subscribing to seasonal pest protection alerts!", response),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/subscribers")
    @Operation(summary = "List all active newsletter subscribers (Admin/Staff view)")
    public ResponseEntity<ApiResponse<List<NewsletterResponse>>> getAllSubscribers() {
        List<NewsletterResponse> subscribers = newsletterService.getAllSubscribers();
        return ResponseEntity.ok(ApiResponse.success(subscribers));
    }
}
