package com.tms.restaurantdiscovery.repository;

import com.tms.restaurantdiscovery.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    // Find restaurants by location (using a partial match, case-insensitive)
    List<Restaurant> findByRestaurantLocationContainingIgnoreCase(String location);

    // Find restaurants by cuisine (using a partial match, case-insensitive)
    List<Restaurant> findByCuisineContainingIgnoreCase(String cuisine);

    // Find restaurants that match both location and cuisine
    List<Restaurant> findByRestaurantLocationContainingIgnoreCaseAndCuisineContainingIgnoreCase(String location, String cuisine);
}
