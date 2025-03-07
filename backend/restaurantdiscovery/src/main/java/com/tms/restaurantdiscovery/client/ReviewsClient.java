package com.tms.restaurantdiscovery.client;

import com.tms.restaurantdiscovery.dto.ReviewDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ReviewsClient {

    private final RestTemplate restTemplate;
    // The Reviews microservice is running on port 8082
    private final String reviewsServiceBaseUrl = "http://localhost:8082/api/reviews/restaurant/";

    public ReviewsClient() {
        this.restTemplate = new RestTemplate();
    }

    public ReviewDTO[] fetchReviewsForRestaurant(Long restaurantId) {
         return restTemplate.getForObject(reviewsServiceBaseUrl + restaurantId, ReviewDTO[].class);
    }
}
