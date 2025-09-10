package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.dev.entity.Driver;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {
    Driver findByEmail(String email);
    Driver findByContact(String contact);
}
