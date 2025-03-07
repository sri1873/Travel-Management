package com.tms.hotelmanagment.service;

import com.tms.hotelmanagment.model.Review;
import com.tms.hotelmanagment.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByHotel(Long hotelId) {
        return reviewRepository.findByHotelId(hotelId);
    }

    public Review addReview(Long hotelId, Review newReview) {
        Review review = new Review();
        review.setHotelId(hotelId); // Set the hotel
        review.setReviewText(newReview.getReviewText());
        review.setRating(newReview.getRating());
        return reviewRepository.save(review); // Save the new review
    }
}
