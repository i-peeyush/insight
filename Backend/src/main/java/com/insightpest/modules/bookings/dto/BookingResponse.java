package com.insightpest.modules.bookings.dto;

import java.time.Instant;

public class BookingResponse {
    private String id;
    private String bookingId;
    private String serviceSlug;
    private String serviceTitle;
    private String propertyType;
    private String scheduledDate;
    private String scheduledTime;
    private String customerName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String notes;
    private String status;
    private Instant createdAt;

    public BookingResponse() {}

    public BookingResponse(String id, String bookingId, String serviceSlug, String serviceTitle,
                           String propertyType, String scheduledDate, String scheduledTime,
                           String customerName, String email, String phone, String address,
                           String city, String state, String zipCode, String notes,
                           String status, Instant createdAt) {
        this.id = id;
        this.bookingId = bookingId;
        this.serviceSlug = serviceSlug;
        this.serviceTitle = serviceTitle;
        this.propertyType = propertyType;
        this.scheduledDate = scheduledDate;
        this.scheduledTime = scheduledTime;
        this.customerName = customerName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.notes = notes;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public String getServiceSlug() { return serviceSlug; }
    public void setServiceSlug(String serviceSlug) { this.serviceSlug = serviceSlug; }

    public String getServiceTitle() { return serviceTitle; }
    public void setServiceTitle(String serviceTitle) { this.serviceTitle = serviceTitle; }

    public String getPropertyType() { return propertyType; }
    public void setPropertyType(String propertyType) { this.propertyType = propertyType; }

    public String getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; }

    public String getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(String scheduledTime) { this.scheduledTime = scheduledTime; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
