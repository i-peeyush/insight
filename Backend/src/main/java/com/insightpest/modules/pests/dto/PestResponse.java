package com.insightpest.modules.pests.dto;

import java.util.List;

public class PestResponse {
    private String id;
    private String slug;
    private String name;
    private String commonName;
    private String scientificName;
    private String category;
    private String riskLevel;
    private String description;
    private List<String> signsOfInfestation;
    private List<String> commonLocations;
    private String healthRisks;
    private List<String> preventionTips;
    private String treatmentApproach;
    private List<String> relatedServices;

    public PestResponse() {}

    public PestResponse(String id, String slug, String name, String commonName, String scientificName,
                        String category, String riskLevel, String description, List<String> signsOfInfestation,
                        List<String> commonLocations, String healthRisks, List<String> preventionTips,
                        String treatmentApproach, List<String> relatedServices) {
        this.id = id;
        this.slug = slug;
        this.name = name;
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.category = category;
        this.riskLevel = riskLevel;
        this.description = description;
        this.signsOfInfestation = signsOfInfestation;
        this.commonLocations = commonLocations;
        this.healthRisks = healthRisks;
        this.preventionTips = preventionTips;
        this.treatmentApproach = treatmentApproach;
        this.relatedServices = relatedServices;
    }

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
}
