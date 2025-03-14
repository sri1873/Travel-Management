package com.tms.flightmanagement.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightSearchDTO {
    private String fromLocation;
    private String toLocation;
    private LocalDate departureDate;
    private LocalDate returnDate;
    private String flightClass;
    private int passengers;
}
