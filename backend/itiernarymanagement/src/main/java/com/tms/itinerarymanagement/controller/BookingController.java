package com.tms.itinerarymanagement.controller;

import com.tms.itinerarymanagement.dto.BookingRequestDto;
import com.tms.itinerarymanagement.model.Booking;
import com.tms.itinerarymanagement.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;


    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequestDto booking) {
        if (booking.getDate() == null) {
            return ResponseEntity.badRequest().body("Date cannot be null");
        }
        Booking savedBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(savedBooking);
    }


    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking deleted");
    }
}

