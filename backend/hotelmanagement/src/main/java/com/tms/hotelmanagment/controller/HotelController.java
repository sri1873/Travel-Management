package com.tms.hotelmanagment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tms.hotelmanagment.model.Hotel;
import com.tms.hotelmanagment.model.Review;
import com.tms.hotelmanagment.service.HotelService;
import com.tms.hotelmanagment.service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private ReviewService reviewService;

    // Endpoint to get all hotels
    @GetMapping("/getAll")
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    // Endpoint to search hotels by location
    @GetMapping("/search")
    public List<Hotel> searchHotels(@RequestParam String location) {
        return hotelService.searchHotelsByLocation(location);
    }

    // Endpoint to get a single hotel by ID
    @GetMapping("/{id}")
    public Hotel getHotel(@PathVariable Long id) {
        return hotelService.getHotelById(id);
    }


    @GetMapping("/{id}/reviews")
    public List<Review> getHotelReviews(@PathVariable Long id) {
        return reviewService.getReviewsByHotel(id);
    }

    @PostMapping("/{id}/reviews")
    public Review addHotelReview(@PathVariable Long id, @RequestBody Review newReview) {
        newReview.setHotelId(id);// Associate the review with the hotel
        return reviewService.addReview(id, newReview);
    }
}

