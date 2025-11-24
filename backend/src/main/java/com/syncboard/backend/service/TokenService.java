package com.syncboard.backend.service;

import com.syncboard.backend.model.User;
import com.syncboard.backend.repository.UserRepository;
import com.syncboard.backend.security.AuthenticatedUser;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TokenService {

    private final UserRepository userRepository;

    public TokenService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthenticatedUser authenticate(String token) {
        if (!StringUtils.hasText(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "缺少访问凭证");
        }

        User user = userRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "token无效或已过期"));

        return new AuthenticatedUser(user.getId(), user.getUsername());
    }
}

