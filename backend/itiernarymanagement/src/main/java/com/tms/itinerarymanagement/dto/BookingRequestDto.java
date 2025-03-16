package com.tms.itinerarymanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDto {
    private Long packageId;
    private String title;
    private String description;
    private String image;
    private String price;
    private LocalDate date;
}