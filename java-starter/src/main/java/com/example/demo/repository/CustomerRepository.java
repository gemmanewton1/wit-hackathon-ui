package com.example.demo.repository;

import com.example.demo.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Mongo repository for Customer
 */
@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> { }