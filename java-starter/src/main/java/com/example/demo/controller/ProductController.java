package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for /products endpoint, supporting CRUD for Product.
 */
@CrossOrigin(origins = "http://localhost:3000") // <--- Allow React frontend origin
@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductRepository repo;

    @PostMapping
    public Product create(@RequestBody Product product) {
        System.out.println("Creating product: " + product);
        return repo.save(product);
    }

    @GetMapping
    public List<Product> getAll() {
        System.out.println("Fetching all products");
        System.out.println("MongoDB connection verified! Product count: " + repo.count());
        System.out.println(repo.findAll());
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Product> getById(@PathVariable("id") String id) {
        System.out.println("Fetching product by id: " + id);
        return repo.findById(id);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable("id") String id, @RequestBody Product product) {
        product.setId(id);
        System.out.println("Updating product: " + product);
        return repo.save(product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        System.out.println("Deleting product by id: " + id);
        repo.deleteById(id);
    }
}