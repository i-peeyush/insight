package com.insightpest.modules.locations.entities;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "locations", indexes = {
    @Index(name = "idx_locations_slug", columnList = "slug", unique = true)
})
public class LocationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, length = 150)
    private String cityName;

    @Column(nullable = false, length = 10)
    private String state;

    @Column(nullable = false, length = 100)
    private String region;

    private String phone;
    private String address;

    @ElementCollection
    @CollectionTable(name = "location_zip_codes", joinColumns = @JoinColumn(name = "location_id"))
    @Column(name = "zip_code", length = 20)
    private List<String> zipCodes = new ArrayList<>();

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @ElementCollection
    @CollectionTable(name = "location_common_pests", joinColumns = @JoinColumn(name = "location_id"))
    @Column(name = "pest_name")
    private List<String> commonPests = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "location_services", joinColumns = @JoinColumn(name = "location_id"))
    @Column(name = "service_name")
    private List<String> servicesAvailable = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "location_highlights", joinColumns = @JoinColumn(name = "location_id"))
    @Column(name = "highlight", length = 500)
    private List<String> highlights = new ArrayList<>();

    private String responseRate;
    private Instant createdAt = Instant.now();

    public LocationEntity() {}

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

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
