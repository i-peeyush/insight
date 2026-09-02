package com.insightpest.modules.blog.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.blog.dto.BlogPostResponse;
import com.insightpest.modules.blog.services.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blog")
@Tag(name = "Blog & Knowledge Base", description = "Endpoints for educational pest prevention articles and entomological insights")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    @Operation(summary = "Get all published blog articles")
    public ResponseEntity<ApiResponse<List<BlogPostResponse>>> getAllPosts() {
        List<BlogPostResponse> posts = blogService.getAllPosts();
        return ResponseEntity.ok(ApiResponse.success(posts));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get a single article detail by slug")
    public ResponseEntity<ApiResponse<BlogPostResponse>> getPostBySlug(@PathVariable String slug) {
        BlogPostResponse post = blogService.getPostBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(post));
    }
}
