package com.insightpest.modules.blog.services;

import com.insightpest.common.exception.ResourceNotFoundException;
import com.insightpest.modules.blog.dto.BlogPostResponse;
import com.insightpest.modules.blog.entities.BlogPostEntity;
import com.insightpest.modules.blog.repositories.BlogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public List<BlogPostResponse> getAllPosts() {
        return blogRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public BlogPostResponse getPostBySlug(String slug) {
        BlogPostEntity entity = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post", "slug", slug));
        return mapToResponse(entity);
    }

    private BlogPostResponse mapToResponse(BlogPostEntity entity) {
        return new BlogPostResponse(
                entity.getId(),
                entity.getSlug(),
                entity.getTitle(),
                entity.getExcerpt(),
                entity.getContent(),
                entity.getCategory(),
                entity.getAuthor(),
                entity.getPublishedDate(),
                entity.getReadingTime(),
                entity.isFeatured(),
                entity.getTags()
        );
    }
}
