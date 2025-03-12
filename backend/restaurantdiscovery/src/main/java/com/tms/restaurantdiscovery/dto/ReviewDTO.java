package com.tms.restaurantdiscovery.dto;

public class ReviewDTO {
    private Long reviewId;
    private Long restaurantId;
    private Double reviewScore;
    private String comment;

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
