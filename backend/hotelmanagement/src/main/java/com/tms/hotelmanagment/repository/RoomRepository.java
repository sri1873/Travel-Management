package com.tms.hotelmanagment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tms.hotelmanagment.model.Room;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotelId(Long hotelId);
    Room findRoomById(Long roomId);
}
