package com.insightpest.modules.contact.services;

import com.insightpest.modules.contact.dto.ContactRequest;
import com.insightpest.modules.contact.dto.ContactResponse;
import com.insightpest.modules.contact.entities.ContactMessageEntity;
import com.insightpest.modules.contact.repositories.ContactRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Transactional
    public ContactResponse saveMessage(ContactRequest request) {
        ContactMessageEntity entity = new ContactMessageEntity();
        entity.setName(request.getName());
        entity.setEmail(request.getEmail());
        entity.setPhone(request.getPhone());
        entity.setSubject(request.getSubject());
        entity.setMessage(request.getMessage());
        entity.setPreferredContactMethod(request.getPreferredContactMethod());
        entity.setStatus("PENDING");

        ContactMessageEntity saved = contactRepository.save(entity);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<ContactResponse> getAllMessages() {
        return contactRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ContactResponse mapToResponse(ContactMessageEntity entity) {
        return new ContactResponse(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getPhone(),
                entity.getSubject(),
                entity.getMessage(),
                entity.getPreferredContactMethod(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }
}
