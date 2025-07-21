package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Objects;

/**
 * Product entity representing an item in the store.
 */
@Entity
@Table(name = "products") // Explicit table name (optional, for clarity)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @Min(value = 0, message = "Price must be non-negative")
    private double price;

    // Default constructor for JPA
    public Product() {}

    // All-args constructor for easy instantiation
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    /**
     * Equals method recommended for JPA entities.
     * Entities are considered equal if their IDs are non-null and equal.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        Product other = (Product) o;
        return id != null && id.equals(other.getId());
    }

    /**
     * HashCode recommended for JPA entities.
     * Uses the ID if set, otherwise defaults to system hash (not persistent).
     */
    @Override
    public int hashCode() {
        return (id != null ? id.hashCode() : super.hashCode());
    }

    @Override
    public String toString() {
        return String.format("Product{id=%d, name='%s', price=%f}", id, name, price);
    }
}