package com.syncboard.backend.service;

import com.syncboard.backend.dto.AuthResponse;
import com.syncboard.backend.dto.LoginRequest;
import com.syncboard.backend.dto.RegisterRequest;
import com.syncboard.backend.model.User;
import com.syncboard.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TokenService tokenService;

    public AuthService(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        userRepository.findByUsername(request.username())
                .ifPresent(user -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "用户名已存在");
                });

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(hashPassword(request.password()));
        User saved = userRepository.save(user);
        String token = tokenService.generateToken(saved);
        return new AuthResponse(saved.getUsername(), token);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "用户不存在"));

        String hashedPassword = hashPassword(request.password());
        if (!hashedPassword.equals(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "密码错误");
        }

        String token = tokenService.generateToken(user);
        return new AuthResponse(user.getUsername(), token);
    }

    private String hashPassword(String rawPassword) {
        try {
            MessageDigest digest = MessageDigest.getInstance("MD5");
            byte[] md5 = digest.digest(rawPassword.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(md5);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("无法初始化MD5加密", e);
        }
    }

}

