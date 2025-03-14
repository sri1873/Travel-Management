package com.tms.flightmanagement.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String airline;

    @Column(nullable = false)
    private String fromLocation;

    @Column(nullable = false)
    private String toLocation;

    @Column(nullable = false)
    private LocalDateTime departureTime;

    @Column(nullable = false)
    private LocalDateTime arrivalTime;

    @Column(nullable = false)
    private String duration;

    private int layovers;
    private String layoverDuration;

    @Column(nullable = false)
    private double price;

    @Enumerated(EnumType.STRING)
    private FlightClass flightClass;  // Enum for Economy, Business, etc.

    private int availableSeats;
}
