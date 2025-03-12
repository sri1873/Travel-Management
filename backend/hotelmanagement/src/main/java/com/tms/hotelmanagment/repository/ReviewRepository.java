package com.tms.hotelmanagment.repository;

import com.tms.hotelmanagment.model.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByHotelId(Long hotelId); // Get reviews by hotel ID
}
