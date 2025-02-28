package com.tms.restaurantdiscovery.dto;

import com.tms.restaurantdiscovery.model.Restaurant;
import java.util.List;

public class RestaurantWithReviewsDTO {
    private Restaurant restaurant;
    private List<ReviewDTO> reviews;
    private Double averageRating;

    // Getters and Setters
    public Restaurant getRestaurant() {
        return restaurant;
    }
    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
    public List<ReviewDTO> getReviews() {
        return reviews;
    }
    public void setReviews(List<ReviewDTO> reviews) {
        this.reviews = reviews;
    }
    public Double getAverageRating() {
        return averageRating;
    }
    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }
}
