package com.tms.hotelmanagment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tms.hotelmanagment.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}

