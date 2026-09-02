package com.insightpest.modules.testimonials.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "testimonials")
public class TestimonialEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 100)
    private String customerName;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(nullable = false, length = 100)
    private String service;

    @Column(nullable = false)
    private int rating;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String review;

    @Column(nullable = false)
    private LocalDate date;

    private boolean verified;
    private String highlight;

    public TestimonialEntity() {}

    public TestimonialEntity(String customerName, String location, String service, int rating, String review, LocalDate date, boolean verified, String highlight) {
        this.customerName = customerName;
        this.location = location;
        this.service = service;
        this.rating = rating;
        this.review = review;
        this.date = date;
        this.verified = verified;
        this.highlight = highlight;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getService() { return service; }
    public void setService(String service) { this.service = service; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public String getHighlight() { return highlight; }
    public void setHighlight(String highlight) { this.highlight = highlight; }
}
