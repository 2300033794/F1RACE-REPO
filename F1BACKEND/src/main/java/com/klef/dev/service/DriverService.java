package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Driver;

public interface DriverService {
    Driver addDriver(Driver driver);
    List<Driver> getAllDrivers();
    Driver getDriverById(int id);
    Driver updateDriver(Driver driver);
    void deleteDriverById(int id);
}
