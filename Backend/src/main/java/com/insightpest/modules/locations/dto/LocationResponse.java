package com.insightpest.modules.locations.dto;

import java.util.List;

public class LocationResponse {
    private String id;
    private String slug;
    private String cityName;
    private String state;
    private String region;
    private String phone;
    private String address;
    private List<String> zipCodes;
    private String description;
    private List<String> commonPests;
    private List<String> servicesAvailable;
    private List<String> highlights;
    private String responseRate;

    public LocationResponse() {}

    public LocationResponse(String id, String slug, String cityName, String state, String region,
                            String phone, String address, List<String> zipCodes, String description,
                            List<String> commonPests, List<String> servicesAvailable,
                            List<String> highlights, String responseRate) {
        this.id = id;
        this.slug = slug;
        this.cityName = cityName;
        this.state = state;
        this.region = region;
        this.phone = phone;
        this.address = address;
        this.zipCodes = zipCodes;
        this.description = description;
        this.commonPests = commonPests;
        this.servicesAvailable = servicesAvailable;
        this.highlights = highlights;
        this.responseRate = responseRate;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public List<String> getZipCodes() { return zipCodes; }
    public void setZipCodes(List<String> zipCodes) { this.zipCodes = zipCodes; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getCommonPests() { return commonPests; }
    public void setCommonPests(List<String> commonPests) { this.commonPests = commonPests; }

    public List<String> getServicesAvailable() { return servicesAvailable; }
    public void setServicesAvailable(List<String> servicesAvailable) { this.servicesAvailable = servicesAvailable; }

    public List<String> getHighlights() { return highlights; }
    public void setHighlights(List<String> highlights) { this.highlights = highlights; }

    public String getResponseRate() { return responseRate; }
    public void setResponseRate(String responseRate) { this.responseRate = responseRate; }
}
