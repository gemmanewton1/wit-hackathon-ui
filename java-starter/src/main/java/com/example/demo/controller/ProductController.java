package com.example.demo.controller;

import com.example.demo.aspect.LoggingAspect;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Autowired
    private ProductRepository repo;

    @PostMapping
    public Product create(@RequestBody Product product) {
        logger.info("Creating product: " + product);
        return repo.save(product);
    }

    @GetMapping
    public List<Product> getAll() {
        logger.info("Fetching all products");
        logger.info("MongoDB connection verified! Product count: " + repo.count());
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Product> getById(@PathVariable("id") String id) {
        logger.info("Fetching product by id: " + id);
        return repo.findById(id);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable("id") String id, @RequestBody Product product) {
        product.setId(id);
        logger.info("Updating product: " + product);
        return repo.save(product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        logger.info("Deleting product by id: " + id);
        repo.deleteById(id);
    }
}