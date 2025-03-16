package com.tms.flightmanagement.booking.service;


import com.tms.flightmanagement.booking.dto.BookingDTO;
import com.tms.flightmanagement.booking.model.Booking;
import com.tms.flightmanagement.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(BookingDTO bookingDTO) {
        Booking booking = new Booking();
        booking.setUserId(bookingDTO.getUserId());
//        booking.setFlight(bookingDTO.getFlightId());
        booking.setNumberOfPassengers(bookingDTO.getNumberOfPassengers());
        booking.setTotalPrice(bookingDTO.getTotalPrice());


        bookingRepository.save(booking);
        return booking;
    }


    public List<Booking> getUserBookings(String userId) {
        try {
            List<Booking> bookings = bookingRepository.findByUserId(userId);
            return bookings.stream().map(Booking::new).collect(Collectors.toList());
        } catch (Exception ex) {

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch flight data", ex);
        }

    }


    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}
