package com.tms.itinerarymanagement.repository;

import com.tms.itinerarymanagement.model.TripPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripPackageRepository extends JpaRepository<TripPackage, Long> {
}

