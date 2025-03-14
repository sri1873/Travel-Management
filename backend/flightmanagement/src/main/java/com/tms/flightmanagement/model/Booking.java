package com.tms.flightmanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Column(nullable = false)
    private String userId; // Reference to user (handled by another service)

    @Column(nullable = false)
    private int numberOfPassengers;

    @Column(nullable = false)
    private double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;
}

