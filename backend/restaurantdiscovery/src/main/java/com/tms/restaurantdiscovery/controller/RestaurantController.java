package com.tms.restaurantdiscovery.controller;

import com.tms.restaurantdiscovery.dto.RestaurantWithReviewsDTO;
import com.tms.restaurantdiscovery.model.Restaurant;
import com.tms.restaurantdiscovery.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    // Endpoint to get all restaurants
    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "Hello, world!";
    }

    // Endpoint to get restaurant details by id
    @GetMapping("/{id}")
    public Optional<Restaurant> getRestaurantById(@PathVariable Long id) {
        return restaurantService.getRestaurantById(id);
    }

    // Endpoint to search restaurants by location and cuisine
    @GetMapping("/search")
    public List<Restaurant> searchRestaurants(@RequestParam(required = false) String location,
                                                @RequestParam(required = false) String cuisine) {
        return restaurantService.searchRestaurants(location, cuisine);
    }

    // New endpoint: Get restaurant details along with reviews
    @GetMapping("/{id}/details")
    public RestaurantWithReviewsDTO getRestaurantWithReviews(@PathVariable Long id) {
        return restaurantService.getRestaurantWithReviews(id);
    }
}
