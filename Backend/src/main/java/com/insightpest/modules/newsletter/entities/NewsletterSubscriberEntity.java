package com.insightpest.modules.newsletter.entities;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "newsletter_subscribers", indexes = {
    @Index(name = "idx_newsletter_email", columnList = "email", unique = true)
})
public class NewsletterSubscriberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false, length = 50)
    private String status = "ACTIVE";

    private Instant subscribedAt = Instant.now();

    public NewsletterSubscriberEntity() {}

    public NewsletterSubscriberEntity(String email) {
        this.email = email;
        this.status = "ACTIVE";
        this.subscribedAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Instant getSubscribedAt() { return subscribedAt; }
    public void setSubscribedAt(Instant subscribedAt) { this.subscribedAt = subscribedAt; }
}
