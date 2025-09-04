package com.example.demo.controller;

import com.example.demo.aspect.LoggingAspect;
import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for /customers endpoint, supporting CRUD for Customer.
 */

@CrossOrigin(origins = "http://localhost:3000") // <--- Allow React frontend origin
@RestController
@RequestMapping("/customers")
public class CustomerController {
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Autowired
    private CustomerRepository repo;

    @PostMapping
    public Customer create(@RequestBody Customer customer) {
        logger.info("Creating customer: " + customer);
        return repo.save(customer);
    }

    @GetMapping
    public List<Customer> getAll() {
        logger.info("Fetching all customers");
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Customer> getById(@PathVariable String id) {
        logger.info("Fetching customer with id: " + id);
        return repo.findById(id);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable String id, @RequestBody Customer customer) {
        logger.info("Updating customer with id: " + id);
        customer.setId(id);
        return repo.save(customer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        logger.info("Deleting customer with id: " + id);
        repo.deleteById(id);
    }
}