package com.tms.hotelmanagment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tms.hotelmanagment.model.Hotel;
import com.tms.hotelmanagment.repository.HotelRepository;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    // Fetch hotels by location
    public List<Hotel> searchHotelsByLocation(String location) {
        return hotelRepository.findByLocationContainingIgnoreCase(location);
    }

    // Fetch a single hotel by ID
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElse(null);
    }
}

