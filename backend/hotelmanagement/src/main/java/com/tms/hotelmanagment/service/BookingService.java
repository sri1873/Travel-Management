package com.tms.hotelmanagment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tms.hotelmanagment.model.Booking;
import com.tms.hotelmanagment.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Create a new booking
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // Get a specific booking by ID
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }
}

