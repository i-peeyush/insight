package com.insightpest.modules.newsletter.services;

import com.insightpest.modules.newsletter.dto.NewsletterRequest;
import com.insightpest.modules.newsletter.dto.NewsletterResponse;
import com.insightpest.modules.newsletter.entities.NewsletterSubscriberEntity;
import com.insightpest.modules.newsletter.repositories.NewsletterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NewsletterService {

    private final NewsletterRepository newsletterRepository;

    public NewsletterService(NewsletterRepository newsletterRepository) {
        this.newsletterRepository = newsletterRepository;
    }

    @Transactional
    public NewsletterResponse subscribe(NewsletterRequest request) {
        Optional<NewsletterSubscriberEntity> existing = newsletterRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            return mapToResponse(existing.get());
        }

        NewsletterSubscriberEntity entity = new NewsletterSubscriberEntity(request.getEmail());
        NewsletterSubscriberEntity saved = newsletterRepository.save(entity);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<NewsletterResponse> getAllSubscribers() {
        return newsletterRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private NewsletterResponse mapToResponse(NewsletterSubscriberEntity entity) {
        return new NewsletterResponse(
                entity.getId(),
                entity.getEmail(),
                entity.getStatus(),
                entity.getSubscribedAt()
        );
    }
}
