package com.insightpest.modules.leads.dto;

import java.time.Instant;

public class LeadResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String propertyType;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String pestProblem;
    private String serviceRequired;
    private String description;
    private String preferredContactMethod;
    private String preferredContactTime;
    private String additionalNotes;
    private boolean consent;
    private String status;
    private Instant createdAt;

    public LeadResponse() {}

    public LeadResponse(String id, String firstName, String lastName, String email, String phone,
                        String propertyType, String address, String city, String state, String zipCode,
                        String pestProblem, String serviceRequired, String description,
                        String preferredContactMethod, String preferredContactTime, String additionalNotes,
                        boolean consent, String status, Instant createdAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.propertyType = propertyType;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.pestProblem = pestProblem;
        this.serviceRequired = serviceRequired;
        this.description = description;
        this.preferredContactMethod = preferredContactMethod;
        this.preferredContactTime = preferredContactTime;
        this.additionalNotes = additionalNotes;
        this.consent = consent;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPropertyType() { return propertyType; }
    public void setPropertyType(String propertyType) { this.propertyType = propertyType; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public String getPestProblem() { return pestProblem; }
    public void setPestProblem(String pestProblem) { this.pestProblem = pestProblem; }

    public String getServiceRequired() { return serviceRequired; }
    public void setServiceRequired(String serviceRequired) { this.serviceRequired = serviceRequired; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPreferredContactMethod() { return preferredContactMethod; }
    public void setPreferredContactMethod(String preferredContactMethod) { this.preferredContactMethod = preferredContactMethod; }

    public String getPreferredContactTime() { return preferredContactTime; }
    public void setPreferredContactTime(String preferredContactTime) { this.preferredContactTime = preferredContactTime; }

    public String getAdditionalNotes() { return additionalNotes; }
    public void setAdditionalNotes(String additionalNotes) { this.additionalNotes = additionalNotes; }

    public boolean isConsent() { return consent; }
    public void setConsent(boolean consent) { this.consent = consent; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
