package com.tms.itinerarymanagement.controller;

import com.tms.itinerarymanagement.model.TripPackage;
import com.tms.itinerarymanagement.service.TripPackageService;
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
    @PostMapping("/add")
    public TripPackage addTripPackage(@RequestBody TripPackage tripPackage) {
        return tripPackageService.saveTripPackage(tripPackage);
    }
    @GetMapping("/{id}")
    public TripPackage getTripPackageById(@PathVariable Long id) {
        return tripPackageService.getTripPackageById(id);
    }
}


