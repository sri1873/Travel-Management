package com.tms.apigateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("restaurant_route", r -> r
                .path("/api/restaurants/**")
                // Use StripPrefix if the downstream service expects the URL without the "/api" segment.
                // .filters(f -> f.stripPrefix(1))
                .uri("http://restaurant-discovery:8081")
            )
            .build();
    }
}
