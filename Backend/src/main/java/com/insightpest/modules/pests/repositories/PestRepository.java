package com.insightpest.modules.pests.repositories;

import com.insightpest.modules.pests.entities.PestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PestRepository extends JpaRepository<PestEntity, String> {
    Optional<PestEntity> findBySlug(String slug);
}
