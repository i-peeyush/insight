package com.insightpest.modules.blog.repositories;

import com.insightpest.modules.blog.entities.BlogPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<BlogPostEntity, String> {
    Optional<BlogPostEntity> findBySlug(String slug);
}
