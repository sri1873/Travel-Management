package com.tms.hotelmanagment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tms.hotelmanagment.model.Room;
import com.tms.hotelmanagment.service.RoomService;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Endpoint to get rooms for a specific hotel
    @GetMapping("/hotel/{hotelId}")
    public List<Room> getRoomsByHotel(@PathVariable Long hotelId) {
        return roomService.getRoomsByHotelId(hotelId);
    }
}
