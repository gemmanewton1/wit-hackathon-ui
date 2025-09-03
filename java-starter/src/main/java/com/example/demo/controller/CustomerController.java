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

@CrossOrigin(origins = "http://localhost:3000") // <--- Allow React frontend origin
@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustomerRepository repo;

    @PostMapping
    public Customer create(@RequestBody Customer customer) {
        System.out.println("Creating customer: " + customer);
        return repo.save(customer);
    }

    @GetMapping
    public List<Customer> getAll() {
        System.out.println("Fetching all customers");
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Customer> getById(@PathVariable String id) {
        System.out.println("Fetching customer with id: " + id);
        return repo.findById(id);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable String id, @RequestBody Customer customer) {
        System.out.println("Updating customer with id: " + id);
        customer.setId(id);
        return repo.save(customer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        System.out.println("Deleting customer with id: " + id);
        repo.deleteById(id);
    }
}