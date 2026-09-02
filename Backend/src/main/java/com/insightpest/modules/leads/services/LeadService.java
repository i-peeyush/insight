package com.insightpest.modules.leads.services;

import com.insightpest.modules.leads.dto.CreateLeadRequest;
import com.insightpest.modules.leads.dto.LeadResponse;
import com.insightpest.modules.leads.entities.LeadEntity;
import com.insightpest.modules.leads.repositories.LeadRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Transactional
    public LeadResponse createLead(CreateLeadRequest request) {
        LeadEntity entity = new LeadEntity();
        entity.setFirstName(request.getFirstName());
        entity.setLastName(request.getLastName());
        entity.setEmail(request.getEmail());
        entity.setPhone(request.getPhone());
        entity.setPropertyType(request.getPropertyType());
        entity.setAddress(request.getAddress());
        entity.setCity(request.getCity());
        entity.setState(request.getState());
        entity.setZipCode(request.getZipCode());
        entity.setPestProblem(request.getPestProblem());
        entity.setServiceRequired(request.getServiceRequired());
        entity.setDescription(request.getDescription());
        entity.setPreferredContactMethod(request.getPreferredContactMethod());
        entity.setPreferredContactTime(request.getPreferredContactTime());
        entity.setAdditionalNotes(request.getAdditionalNotes());
        entity.setConsent(request.isConsent());
        entity.setStatus("NEW");

        LeadEntity saved = leadRepository.save(entity);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<LeadResponse> getAllLeads() {
        return leadRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private LeadResponse mapToResponse(LeadEntity entity) {
        return new LeadResponse(
                entity.getId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getEmail(),
                entity.getPhone(),
                entity.getPropertyType(),
                entity.getAddress(),
                entity.getCity(),
                entity.getState(),
                entity.getZipCode(),
                entity.getPestProblem(),
                entity.getServiceRequired(),
                entity.getDescription(),
                entity.getPreferredContactMethod(),
                entity.getPreferredContactTime(),
                entity.getAdditionalNotes(),
                entity.isConsent(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }
}
