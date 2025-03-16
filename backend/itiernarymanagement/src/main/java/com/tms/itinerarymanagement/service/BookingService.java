package com.tms.itinerarymanagement.service;

import com.tms.itinerarymanagement.dto.BookingRequestDto;
import com.tms.itinerarymanagement.model.Booking;
import com.tms.itinerarymanagement.repository.BookingRepository;
import com.tms.itinerarymanagement.repository.TripPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TripPackageRepository tripPackageRepository;

    public Booking createBooking(BookingRequestDto request) {
        return bookingRepository.save(Booking.builder()
                .packageId(request.getPackageId())
                .title(request.getTitle())
                .description(request.getDescription())
                .image(request.getImage())
                .price(request.getPrice())
                .date(request.getDate())
                .build());
    }

    public List<Booking> getAllBookings() {

        List<Booking> all = bookingRepository.getAll();
        return all;
    }

    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}
