package com.example.demo;

import com.example.demo.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.repository.CustomerRepository;

@Component
public class MongoConnectionVerifier implements CommandLineRunner {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) {
        try {
            long countCustomer = customerRepository.count();
            System.out.println("MongoDB connection verified! \n Customer count: " + countCustomer);
            long countProduct = productRepository.count();
            System.out.println("Product count: " + countProduct);
        } catch (Exception e) {
            System.err.println("Cannot connect to MongoDB: " + e.getMessage());
        }
    }
}