package com.tms.restaurantdiscovery.service;

import com.tms.restaurantdiscovery.dto.RestaurantWithReviewsDTO;
import com.tms.restaurantdiscovery.dto.ReviewDTO;
import com.tms.restaurantdiscovery.model.Restaurant;
import com.tms.restaurantdiscovery.repository.RestaurantRepository;
import com.tms.restaurantdiscovery.client.ReviewsClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final ReviewsClient reviewsClient;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository, ReviewsClient reviewsClient) {
        this.restaurantRepository = restaurantRepository;
        this.reviewsClient = reviewsClient;
    }

    // Retrieve all restaurants
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    // Retrieve a restaurant by its ID
    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }

    // Search restaurants based on location and cuisine
    public List<Restaurant> searchRestaurants(String location, String cuisine) {
        // (Filtering logic as implemented earlier)
        if ((location == null || location.isEmpty()) && (cuisine == null || cuisine.isEmpty())) {
            return restaurantRepository.findAll();
        } else if (location != null && !location.isEmpty() && (cuisine == null || cuisine.isEmpty())) {
            return restaurantRepository.findByRestaurantLocationContainingIgnoreCase(location);
        } else if ((location == null || location.isEmpty()) && cuisine != null && !cuisine.isEmpty()) {
            return restaurantRepository.findByCuisineContainingIgnoreCase(cuisine);
        } else {
            return restaurantRepository.findByRestaurantLocationContainingIgnoreCaseAndCuisineContainingIgnoreCase(location, cuisine);
        }
    }

    // Retrieve restaurant details along with its reviews
    public RestaurantWithReviewsDTO getRestaurantWithReviews(Long id) {
         Optional<Restaurant> restaurantOpt = restaurantRepository.findById(id);
         if (restaurantOpt.isEmpty()) {
             return null; // Or throw an exception as needed
         }
         Restaurant restaurant = restaurantOpt.get();
         // Call the Reviews microservice to get reviews
         ReviewDTO[] reviewsArray = reviewsClient.fetchReviewsForRestaurant(id);
         List<ReviewDTO> reviewsList = Arrays.asList(reviewsArray);

         // Calculate the average rating
         double averageRating = reviewsList.stream()
                 .mapToDouble(review -> review.getReviewScore() != null ? review.getReviewScore() : 0.0)
                 .average()
                 .orElse(0.0);

         // Prepare the DTO with both restaurant details and reviews
         RestaurantWithReviewsDTO dto = new RestaurantWithReviewsDTO();
         dto.setRestaurant(restaurant);
         dto.setReviews(reviewsList);
         dto.setAverageRating(averageRating);

         return dto;
    }
}
