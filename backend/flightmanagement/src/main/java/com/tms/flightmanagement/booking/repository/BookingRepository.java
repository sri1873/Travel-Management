package com.tms.flightmanagement.booking.repository;

import com.tms.flightmanagement.booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Fetch bookings for a specific user
    List<Booking> findByUserId(String userId);

    // Fetch bookings for a specific flight
    List<Booking> findByFlightId(Long flightId);
}
