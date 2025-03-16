package com.tms.flightmanagement.booking.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequestDTO {
    private Long flightId;
    private String userId;
    private int numberOfPassengers;
}
