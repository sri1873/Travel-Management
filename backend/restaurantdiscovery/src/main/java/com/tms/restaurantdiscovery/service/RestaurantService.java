package com.tms.restaurantdiscovery.service;

import com.tms.restaurantdiscovery.model.Restaurant;
import com.tms.restaurantdiscovery.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
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
        // Implement filtering logic as required.
        // For now, return all restaurants as a stub.
        return restaurantRepository.findAll();
    }
}
