package com.tms.flightmanagement.service;

import com.tms.flightmanagement.dto.FlightDTO;
import com.tms.flightmanagement.model.Flight;
import com.tms.flightmanagement.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;


    public Flight addFlight(FlightDTO flightDTO) {
        Flight flight = new Flight();
        flight.setAirline(flightDTO.getAirline());
        flight.setFromLocation(flightDTO.getFromLocation());
        flight.setToLocation(flightDTO.getToLocation());
        flight.setDepartureTime(flightDTO.getDepartureTime());
        flight.setArrivalTime(flightDTO.getArrivalTime());
        flight.setPrice(flightDTO.getPrice());
        flight.setDuration(flightDTO.getDuration());
        flight.setLayover(flightDTO.getLayover());
        flight.setLayoverDuration(flightDTO.getLayoverDuration());
        flightRepository.save(flight);
        return flight;
    }


    public List<FlightDTO> searchFlights(String from, String to, LocalDate departureDate) {
        try {
            List<Flight> flights = flightRepository.findByFromLocationAndToLocationAndDepartureTime(from, to, departureDate);
            return flights.stream().map(FlightDTO::new).collect(Collectors.toList());
        } catch (Exception ex) {

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch flight data", ex);
        }


    }


    public FlightDTO getFlightById(Long flightId) {
        try {
            FlightDTO flight = flightRepository.findById(flightId).map(FlightDTO::new).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found"));
            return flight;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch flight data", ex);
        }
    }


    public void deleteFlight(Long flightId) {
        flightRepository.deleteById(flightId);
    }
}
