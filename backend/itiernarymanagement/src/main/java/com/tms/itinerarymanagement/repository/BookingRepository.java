package com.tms.itinerarymanagement.repository;

import com.tms.itinerarymanagement.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query(value = "SELECT * FROM public.booking ORDER BY id ASC ", nativeQuery = true)
    public List<Booking> getAll();
}
