package com.tms.restaurantreviews.service;

import com.tms.restaurantreviews.model.Review;
import com.tms.restaurantreviews.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    
    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // Retrieve all reviews
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Retrieve reviews for a specific restaurant
    public List<Review> getReviewsByRestaurantId(Long restaurantId) {
        return reviewRepository.findByRestaurantId(restaurantId);
    }

    // Retrieve a single review by its ID
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    // Save a new review
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }
    
    // Future: Add methods for updating or deleting reviews as needed.
}
