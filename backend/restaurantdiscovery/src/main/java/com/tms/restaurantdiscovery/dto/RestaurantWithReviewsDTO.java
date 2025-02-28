package com.tms.restaurantdiscovery.dto;

import com.tms.restaurantdiscovery.model.Restaurant;
import java.util.List;

public class RestaurantWithReviewsDTO {
    private Restaurant restaurant;
    private List<ReviewDTO> reviews;

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
}
