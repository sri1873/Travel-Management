package com.tms.hotelmanagment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tms.hotelmanagment.model.Booking;
import com.tms.hotelmanagment.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Endpoint to create a new booking
    @PostMapping("/createBooking")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    // Endpoint to get a specific booking by ID
    @GetMapping("/{id}")
    public Booking getBooking(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }
}
