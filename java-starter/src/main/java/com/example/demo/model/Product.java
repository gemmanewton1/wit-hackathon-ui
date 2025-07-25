package com.example.demo.model;

import jakarta.validation.constraints.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

/**
 * Product entity representing an item in the store (MongoDB document).
 */
@Document(collection = "products")
public class Product {
    @Id
    private String id;

    @NotBlank(message = "Product name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @Min(value = 0, message = "Price must be non-negative")
    private double price;

    // Default constructor required by frameworks
    public Product() {}

    // All-args constructor for easy instantiation
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    /**
     * Equals method for MongoDB entities.
     * Two products are equal if their IDs are non-null and equal.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product other)) return false;
        return id != null && id.equals(other.getId());
    }

    /**
     * HashCode for MongoDB entities.
     * Uses the ID if set, otherwise defaults to system hash.
     */
    @Override
    public int hashCode() {
        return (id != null ? id.hashCode() : super.hashCode());
    }

    @Override
    public String toString() {
        return String.format("Product{id=%s, name='%s', price=%f}", id, name, price);
    }
}