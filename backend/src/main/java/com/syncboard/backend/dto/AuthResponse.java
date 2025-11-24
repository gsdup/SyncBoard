package com.syncboard.backend.dto;

public record AuthResponse(
        String username,
        String token
) {
}

