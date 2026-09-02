package com.insightpest.modules.newsletter.dto;

import java.time.Instant;

public class NewsletterResponse {
    private String id;
    private String email;
    private String status;
    private Instant subscribedAt;

    public NewsletterResponse() {}

    public NewsletterResponse(String id, String email, String status, Instant subscribedAt) {
        this.id = id;
        this.email = email;
        this.status = status;
        this.subscribedAt = subscribedAt;
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
