package com.insightpest.modules.services.services;

import com.insightpest.common.exception.ResourceNotFoundException;
import com.insightpest.modules.services.dto.ServiceResponse;
import com.insightpest.modules.services.entities.ServiceEntity;
import com.insightpest.modules.services.repositories.ServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceResponse> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ServiceResponse getServiceBySlug(String slug) {
        ServiceEntity entity = serviceRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "slug", slug));
        return mapToResponse(entity);
    }

    private ServiceResponse mapToResponse(ServiceEntity entity) {
        return new ServiceResponse(
                entity.getId(),
                entity.getSlug(),
                entity.getTitle(),
                entity.getShortDescription(),
                entity.getFullDescription(),
                entity.getCategory(),
                entity.getIcon(),
                entity.isFeatured(),
                entity.getPricingEstimate(),
                entity.getTargetPests(),
                entity.getFeatures(),
                entity.getWarranty()
        );
    }
}
