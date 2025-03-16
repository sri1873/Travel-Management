package com.tms.flightmanagement.booking.controller;

import com.tms.flightmanagement.booking.dto.FlightDTO;
import com.tms.flightmanagement.booking.model.Flight;
import com.tms.flightmanagement.booking.service.FlightService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/flights")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "bearerAuth")
public class FlightController {

    @Autowired
    private FlightService flightService;

    // Add a new flight
    @PostMapping
    public Flight addFlight(@RequestBody FlightDTO flightDTO) {
        return flightService.addFlight(flightDTO);
    }

    // Search flights by departure, destination, and date
    @GetMapping("/search")
    public List<FlightDTO> searchFlights(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam String departureDate) {
        return flightService.searchFlights(from, to, LocalDate.parse(departureDate));
    }

    // Get flight details by ID
    @GetMapping("/{flightId}")
    public FlightDTO getFlightById(@PathVariable Long flightId) {
        return flightService.getFlightById(flightId);
    }

    // Delete a flight
    @DeleteMapping("/{flightId}")
    public void deleteFlight(@PathVariable Long flightId) {
        flightService.deleteFlight(flightId);
    }
}

