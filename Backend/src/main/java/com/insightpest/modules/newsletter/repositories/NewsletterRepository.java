package com.insightpest.modules.newsletter.repositories;

import com.insightpest.modules.newsletter.entities.NewsletterSubscriberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsletterRepository extends JpaRepository<NewsletterSubscriberEntity, String> {
    Optional<NewsletterSubscriberEntity> findByEmail(String email);
}
