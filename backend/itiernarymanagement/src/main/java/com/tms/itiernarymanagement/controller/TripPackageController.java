package com.tms.itiernarymanagement.controller;

import com.tms.itiernarymanagement.model.TripPackage;
import com.tms.itiernarymanagement.service.TripPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-packages")
@CrossOrigin(origins = "http://localhost:3000")
public class TripPackageController {
    @Autowired
    private TripPackageService tripPackageService;

    @GetMapping
    public List<TripPackage> getAllTripPackages() {
        return tripPackageService.getAllTripPackages();
    }

    @GetMapping("/{id}")
    public TripPackage getTripPackageById(@PathVariable Long id) {
        return tripPackageService.getTripPackageById(id);
    }
}


