package com.insightpest.modules.locations.services;

import com.insightpest.common.exception.ResourceNotFoundException;
import com.insightpest.modules.locations.dto.LocationResponse;
import com.insightpest.modules.locations.entities.LocationEntity;
import com.insightpest.modules.locations.repositories.LocationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<LocationResponse> getAllLocations() {
        return locationRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public LocationResponse getLocationBySlug(String slug) {
        LocationEntity entity = locationRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Location", "slug", slug));
        return mapToResponse(entity);
    }

    private LocationResponse mapToResponse(LocationEntity entity) {
        return new LocationResponse(
                entity.getId(),
                entity.getSlug(),
                entity.getCityName(),
                entity.getState(),
                entity.getRegion(),
                entity.getPhone(),
                entity.getAddress(),
                entity.getZipCodes(),
                entity.getDescription(),
                entity.getCommonPests(),
                entity.getServicesAvailable(),
                entity.getHighlights(),
                entity.getResponseRate()
        );
    }
}
