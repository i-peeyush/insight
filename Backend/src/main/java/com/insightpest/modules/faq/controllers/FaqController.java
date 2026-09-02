package com.insightpest.modules.faq.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.faq.dto.FaqResponse;
import com.insightpest.modules.faq.services.FaqService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/faqs")
@Tag(name = "FAQ", description = "Endpoints for frequently asked questions, treatment safety, and customer guidance")
public class FaqController {

    private final FaqService faqService;

    public FaqController(FaqService faqService) {
        this.faqService = faqService;
    }

    @GetMapping
    @Operation(summary = "Get all FAQ entries, optionally filtered by category")
    public ResponseEntity<ApiResponse<List<FaqResponse>>> getFaqs(
            @RequestParam(required = false) String category) {
        List<FaqResponse> faqs = faqService.getAllFaqs(category);
        return ResponseEntity.ok(ApiResponse.success(faqs));
    }
}
