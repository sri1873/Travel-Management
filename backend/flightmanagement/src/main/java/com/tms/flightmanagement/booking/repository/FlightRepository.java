package com.tms.flightmanagement.booking.repository;

import com.tms.flightmanagement.booking.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

    // Search for flights based on from, to, and departure date
    List<Flight> findByFromLocationAndToLocationAndDepartureTime(
            String fromLocation, String toLocation, LocalDate startOfDay);
}
