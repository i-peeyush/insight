package com.insightpest.modules.locations.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.locations.dto.LocationResponse;
import com.insightpest.modules.locations.services.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/locations")
@Tag(name = "Locations & Service Areas", description = "Endpoints for regional coverage, city branches, and local service availability")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    @Operation(summary = "Get all serviced cities and regional branches")
    public ResponseEntity<ApiResponse<List<LocationResponse>>> getAllLocations() {
        List<LocationResponse> locations = locationService.getAllLocations();
        return ResponseEntity.ok(ApiResponse.success(locations));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get local branch and pest coverage information by city slug")
    public ResponseEntity<ApiResponse<LocationResponse>> getLocationBySlug(@PathVariable String slug) {
        LocationResponse location = locationService.getLocationBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(location));
    }
}
