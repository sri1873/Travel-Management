package com.tms.flightmanagement.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightDTO {
    private Long id;
    private String airline;
    private String fromLocation;
    private String toLocation;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String duration;
    private int layovers;
    private String layoverDuration;
    private double price;
    private String flightClass;  // Economy, Business, etc.
    private int availableSeats;
}
