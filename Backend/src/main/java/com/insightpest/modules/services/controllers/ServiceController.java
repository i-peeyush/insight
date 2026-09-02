package com.insightpest.modules.services.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.services.dto.ServiceResponse;
import com.insightpest.modules.services.services.ServiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/services")
@Tag(name = "Services", description = "Endpoints for retrieving pest control service programs and catalogs")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    @Operation(summary = "Get all available pest control service programs")
    public ResponseEntity<ApiResponse<List<ServiceResponse>>> getAllServices() {
        List<ServiceResponse> services = serviceService.getAllServices();
        return ResponseEntity.ok(ApiResponse.success(services));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get detailed information for a specific service by slug")
    public ResponseEntity<ApiResponse<ServiceResponse>> getServiceBySlug(@PathVariable String slug) {
        ServiceResponse service = serviceService.getServiceBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(service));
    }
}
