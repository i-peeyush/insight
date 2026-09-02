package com.insightpest.modules.pests.entities;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pests", indexes = {
    @Index(name = "idx_pests_slug", columnList = "slug", unique = true),
    @Index(name = "idx_pests_category", columnList = "category")
})
public class PestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, length = 100)
    private String name;

    private String commonName;
    private String scientificName;
    private String category;
    private String riskLevel;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @ElementCollection
    @CollectionTable(name = "pest_signs", joinColumns = @JoinColumn(name = "pest_id"))
    @Column(name = "sign", length = 500)
    private List<String> signsOfInfestation = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "pest_locations", joinColumns = @JoinColumn(name = "pest_id"))
    @Column(name = "location_name")
    private List<String> commonLocations = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String healthRisks;

    @ElementCollection
    @CollectionTable(name = "pest_prevention_tips", joinColumns = @JoinColumn(name = "pest_id"))
    @Column(name = "tip", length = 500)
    private List<String> preventionTips = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String treatmentApproach;

    @ElementCollection
    @CollectionTable(name = "pest_related_services", joinColumns = @JoinColumn(name = "pest_id"))
    @Column(name = "service_slug")
    private List<String> relatedServices = new ArrayList<>();

    private Instant createdAt = Instant.now();

    public PestEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCommonName() { return commonName; }
    public void setCommonName(String commonName) { this.commonName = commonName; }

    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getSignsOfInfestation() { return signsOfInfestation; }
    public void setSignsOfInfestation(List<String> signsOfInfestation) { this.signsOfInfestation = signsOfInfestation; }

    public List<String> getCommonLocations() { return commonLocations; }
    public void setCommonLocations(List<String> commonLocations) { this.commonLocations = commonLocations; }

    public String getHealthRisks() { return healthRisks; }
    public void setHealthRisks(String healthRisks) { this.healthRisks = healthRisks; }

    public List<String> getPreventionTips() { return preventionTips; }
    public void setPreventionTips(List<String> preventionTips) { this.preventionTips = preventionTips; }

    public String getTreatmentApproach() { return treatmentApproach; }
    public void setTreatmentApproach(String treatmentApproach) { this.treatmentApproach = treatmentApproach; }

    public List<String> getRelatedServices() { return relatedServices; }
    public void setRelatedServices(List<String> relatedServices) { this.relatedServices = relatedServices; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
