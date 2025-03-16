package com.tms.itinerarymanagement.service;


import com.tms.itinerarymanagement.model.TripPackage;
import com.tms.itinerarymanagement.repository.TripPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripPackageService {
    @Autowired
    private TripPackageRepository tripPackageRepository;

    public List<TripPackage> getAllTripPackages() {
        return tripPackageRepository.findAll();
    }

    public TripPackage getTripPackageById(Long id) {
        return tripPackageRepository.findById(id).orElse(null);
    }

    public TripPackage saveTripPackage(TripPackage tripPackage) {
        return tripPackageRepository.save(tripPackage);
    }
}
