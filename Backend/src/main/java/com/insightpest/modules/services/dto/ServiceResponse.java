package com.insightpest.modules.services.dto;

import java.util.List;

public class ServiceResponse {
    private String id;
    private String slug;
    private String title;
    private String shortDescription;
    private String fullDescription;
    private String category;
    private String icon;
    private boolean featured;
    private String pricingEstimate;
    private List<String> targetPests;
    private List<String> features;
    private String warranty;

    public ServiceResponse() {}

    public ServiceResponse(String id, String slug, String title, String shortDescription, String fullDescription,
                           String category, String icon, boolean featured, String pricingEstimate,
                           List<String> targetPests, List<String> features, String warranty) {
        this.id = id;
        this.slug = slug;
        this.title = title;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.category = category;
        this.icon = icon;
        this.featured = featured;
        this.pricingEstimate = pricingEstimate;
        this.targetPests = targetPests;
        this.features = features;
        this.warranty = warranty;
    }

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
}
