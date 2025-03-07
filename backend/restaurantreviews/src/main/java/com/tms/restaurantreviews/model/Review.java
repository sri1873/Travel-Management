package com.tms.restaurantreviews.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    // The restaurant ID from RestaurantDB (managed by the application)
    private Long restaurantId;
    
    // Review score, e.g., a decimal value
    private Double reviewScore;
    
    // Review comment (optional)
    private String comment;

    // Constructors
    public Review() {}

    public Review(Long restaurantId, Double reviewScore, String comment) {
        this.restaurantId = restaurantId;
        this.reviewScore = reviewScore;
        this.comment = comment;
    }

    // Getters and Setters
    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Double getReviewScore() {
        return reviewScore;
    }

    public void setReviewScore(Double reviewScore) {
        this.reviewScore = reviewScore;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
