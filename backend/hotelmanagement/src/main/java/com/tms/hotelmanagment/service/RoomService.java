package com.tms.hotelmanagment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tms.hotelmanagment.model.Room;
import com.tms.hotelmanagment.repository.RoomRepository;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    // Get rooms for a specific hotel
    public List<Room> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    // Get room by id
    public Room getRoomById(Long roomId) {
        return roomRepository.findRoomById(roomId);
    }
}
