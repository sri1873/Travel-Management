package com.tms.flightmanagement.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDTO {
    private Long id;
    private Long flightId;
    private String userId;
    private int numberOfPassengers;
    private double totalPrice;
    private String status;  // PENDING, CONFIRMED, CANCELLED
}
