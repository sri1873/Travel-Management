package com.tms.flightmanagement.booking.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightCreateDTO {
    private String airline;
    private String fromLocation;
    private String toLocation;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String duration;
    private int layovers;
    private String layoverDuration;
    private double price;
    private String flightClass;
    private int availableSeats;
}
