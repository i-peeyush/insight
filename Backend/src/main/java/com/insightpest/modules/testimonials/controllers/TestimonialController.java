package com.insightpest.modules.testimonials.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.testimonials.dto.TestimonialResponse;
import com.insightpest.modules.testimonials.services.TestimonialService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/testimonials")
@Tag(name = "Testimonials", description = "Endpoints for verified customer ratings and service reviews")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    @Operation(summary = "Get all customer reviews and ratings")
    public ResponseEntity<ApiResponse<List<TestimonialResponse>>> getAllTestimonials() {
        List<TestimonialResponse> testimonials = testimonialService.getAllTestimonials();
        return ResponseEntity.ok(ApiResponse.success(testimonials));
    }
}
