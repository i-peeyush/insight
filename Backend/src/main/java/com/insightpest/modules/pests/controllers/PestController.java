package com.insightpest.modules.pests.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.pests.dto.PestResponse;
import com.insightpest.modules.pests.services.PestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pests")
@Tag(name = "Pest Library", description = "Endpoints for pest species profiles, identification signs, risks, and prevention guides")
public class PestController {

    private final PestService pestService;

    public PestController(PestService pestService) {
        this.pestService = pestService;
    }

    @GetMapping
    @Operation(summary = "Get all pest identification library profiles")
    public ResponseEntity<ApiResponse<List<PestResponse>>> getAllPests() {
        List<PestResponse> pests = pestService.getAllPests();
        return ResponseEntity.ok(ApiResponse.success(pests));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get detailed biology and treatment guide for a pest species by slug")
    public ResponseEntity<ApiResponse<PestResponse>> getPestBySlug(@PathVariable String slug) {
        PestResponse pest = pestService.getPestBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(pest));
    }
}
