package com.aggregated_blood_donation.aggregated_blood_donation.api;

import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

record BloodRequest(UUID id,
                    String bloodType,
                    String rh,
                    int units,
                    double lat,
                    double lng,
                    Instant createdAt) {}


@RestController
@RequestMapping("/requests")
public class RequestController {

    @GetMapping
    public List<BloodRequest> list() {
        return List.of(
                new BloodRequest(UUID.randomUUID(), "O", "+", 2, 27.7172, 85.3240, Instant.now()),
                new BloodRequest(UUID.randomUUID(), "A", "-", 1, 27.7000, 85.3333, Instant.now())
        );
    }
}
