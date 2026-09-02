package com.insightpest.modules.services.entities;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "services", indexes = {
    @Index(name = "idx_services_slug", columnList = "slug", unique = true),
    @Index(name = "idx_services_category", columnList = "category")
})
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String shortDescription;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String fullDescription;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(length = 50)
    private String icon;

    private boolean featured;
    private String pricingEstimate;

    @ElementCollection
    @CollectionTable(name = "service_target_pests", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "pest_name")
    private List<String> targetPests = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "service_features", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "feature", length = 500)
    private List<String> features = new ArrayList<>();

    @Column(length = 500)
    private String warranty;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    public ServiceEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public String getPricingEstimate() { return pricingEstimate; }
    public void setPricingEstimate(String pricingEstimate) { this.pricingEstimate = pricingEstimate; }

    public List<String> getTargetPests() { return targetPests; }
    public void setTargetPests(List<String> targetPests) { this.targetPests = targetPests; }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }

    public String getWarranty() { return warranty; }
    public void setWarranty(String warranty) { this.warranty = warranty; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
