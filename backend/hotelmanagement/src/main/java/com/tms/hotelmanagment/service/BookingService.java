package com.tms.hotelmanagment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tms.hotelmanagment.model.Booking;
import com.tms.hotelmanagment.model.Room;
import com.tms.hotelmanagment.repository.BookingRepository;
import com.tms.hotelmanagment.repository.RoomRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    // Create a new booking
    public Booking createBooking(Booking booking) {
        Long roomId = booking.getRoomId();
        Room room = roomRepository.findById(roomId).orElse(null);

        if (room == null) {
            throw new RuntimeException("Room not found.");
        }

        if (room.getAvailable() > 0) {

            room.setAvailable(room.getAvailable() - 1);
            roomRepository.save(room);

            return bookingRepository.save(booking);
        } else {
            throw new RuntimeException("No rooms available.");
        }
    }

    // Get a specific booking by ID
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }
}
