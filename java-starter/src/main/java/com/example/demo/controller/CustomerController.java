package com.example.demo.controller;

import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for /customers endpoint, supporting CRUD for Customer.
 */
@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustomerRepository repo;

    @PostMapping
    public Customer create(@RequestBody Customer customer) {
        return repo.save(customer);
    }

    @GetMapping
    public List<Customer> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Customer> getById(@PathVariable Long id) {
        return repo.findById(id);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Long id, @RequestBody Customer customer) {
        customer.setId(id);
        return repo.save(customer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}