package com.example.demo.model;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Customer entity representing a person in the system (MongoDB document).
 */
@Document(collection = "customers")
public class Customer {

    @Id
    private String id;

    @NotBlank(message = "First name is required")
    @Size(max = 50)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50)
    private String lastName;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @Pattern(regexp = "^[+]?[0-9\\- ]{7,15}$", message = "Phone number format is invalid")
    private String phone;

    private String address;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    private Boolean active = true;

    // Auditing fields
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Default constructor
    public Customer() {}

    // Full constructor
    public Customer(String firstName, String lastName, String email, String phone,
                    String address, LocalDate dateOfBirth, Boolean active) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.active = active;
    }

    // Manual auditing (call from service or controller)
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // equals() and hashCode() by MongoDB id
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Customer other)) return false;
        if (id == null || other.id == null) return false;
        return id.equals(other.id);
    }

    @Override
    public int hashCode() {
        return (id != null ? id.hashCode() : super.hashCode());
    }

    // Getters and setters
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
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}