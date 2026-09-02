package com.insightpest.modules.services.repositories;

import com.insightpest.modules.services.entities.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, String> {
    Optional<ServiceEntity> findBySlug(String slug);
    List<ServiceEntity> findByCategoryIgnoreCase(String category);
    List<ServiceEntity> findByFeaturedTrue();
}
