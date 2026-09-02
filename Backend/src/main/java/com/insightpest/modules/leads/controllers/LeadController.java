package com.insightpest.modules.leads.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.leads.dto.CreateLeadRequest;
import com.insightpest.modules.leads.dto.LeadResponse;
import com.insightpest.modules.leads.services.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leads")
@Tag(name = "Leads & Quotes", description = "Endpoints for inbound quote requests, callback inquiries, and lead management")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping
    @Operation(summary = "Submit a new homeowner or commercial quote request")
    public ResponseEntity<ApiResponse<LeadResponse>> submitQuote(
            @Valid @RequestBody CreateLeadRequest request) {
        LeadResponse lead = leadService.createLead(request);
        return new ResponseEntity<>(
                ApiResponse.success("Your quote request has been received! An Insight specialist will contact you shortly.", lead),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    @Operation(summary = "Get all incoming leads (Admin/Staff view)")
    public ResponseEntity<ApiResponse<List<LeadResponse>>> getAllLeads() {
        List<LeadResponse> leads = leadService.getAllLeads();
        return ResponseEntity.ok(ApiResponse.success(leads));
    }
}
