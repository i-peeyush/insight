package com.insightpest.modules.testimonials.dto;

import java.time.LocalDate;

public class TestimonialResponse {
    private String id;
    private String customerName;
    private String location;
    private String service;
    private int rating;
    private String review;
    private LocalDate date;
    private boolean verified;
    private String highlight;

    public TestimonialResponse() {}

    public TestimonialResponse(String id, String customerName, String location, String service, int rating, String review, LocalDate date, boolean verified, String highlight) {
        this.id = id;
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
