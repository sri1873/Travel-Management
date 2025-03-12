package com.tms.restaurantreviews.repository;

import com.tms.restaurantreviews.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Find reviews for a specific restaurant
    List<Review> findByRestaurantId(Long restaurantId);
}
