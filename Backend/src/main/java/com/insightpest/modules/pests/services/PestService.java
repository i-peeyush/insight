package com.insightpest.modules.pests.services;

import com.insightpest.common.exception.ResourceNotFoundException;
import com.insightpest.modules.pests.dto.PestResponse;
import com.insightpest.modules.pests.entities.PestEntity;
import com.insightpest.modules.pests.repositories.PestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PestService {

    private final PestRepository pestRepository;

    public PestService(PestRepository pestRepository) {
        this.pestRepository = pestRepository;
    }

    public List<PestResponse> getAllPests() {
        return pestRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PestResponse getPestBySlug(String slug) {
        PestEntity entity = pestRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Pest", "slug", slug));
        return mapToResponse(entity);
    }

    private PestResponse mapToResponse(PestEntity entity) {
        return new PestResponse(
                entity.getId(),
                entity.getSlug(),
                entity.getName(),
                entity.getCommonName(),
                entity.getScientificName(),
                entity.getCategory(),
                entity.getRiskLevel(),
                entity.getDescription(),
                entity.getSignsOfInfestation(),
                entity.getCommonLocations(),
                entity.getHealthRisks(),
                entity.getPreventionTips(),
                entity.getTreatmentApproach(),
                entity.getRelatedServices()
        );
    }
}
