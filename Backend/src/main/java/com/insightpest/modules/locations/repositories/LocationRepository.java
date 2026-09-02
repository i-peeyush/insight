package com.insightpest.modules.locations.repositories;

import com.insightpest.modules.locations.entities.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, String> {
    Optional<LocationEntity> findBySlug(String slug);
}
