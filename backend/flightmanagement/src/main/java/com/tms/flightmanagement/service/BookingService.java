package com.tms.flightmanagement.service;


import com.tms.flightmanagement.dto.BookingDTO;
import com.tms.flightmanagement.model.Booking;
import com.tms.flightmanagement.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream().map(Booking::new).collect(Collectors.toList());
    }


    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}
