package com.tms.itiernarymanagement.repository;

import com.tms.itiernarymanagement.model.TripPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripPackageRepository extends JpaRepository<TripPackage, Long> {
}

