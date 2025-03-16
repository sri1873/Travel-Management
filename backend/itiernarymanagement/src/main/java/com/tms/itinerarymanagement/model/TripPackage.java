package com.tms.itinerarymanagement.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "trip_packages")
@Data
public class TripPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String description;
    private String image;
    private String price;
    private String essentials;
    private String reviews;

}
