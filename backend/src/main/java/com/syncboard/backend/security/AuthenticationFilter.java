package com.syncboard.backend.security;

import com.syncboard.backend.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Set;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    private static final Set<String> WHITELIST = Set.of(
            "/api/auth/login",
            "/api/auth/register"
    );

    private final TokenService tokenService;

    public AuthenticationFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            if (shouldSkip(request)) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = resolveToken(request);
            AuthenticatedUser user = tokenService.authenticate(token);
            AuthenticatedUserHolder.set(user);
            request.setAttribute(AuthenticatedUserHolder.REQUEST_ATTRIBUTE, user);
            filterChain.doFilter(request, response);
        } catch (ResponseStatusException ex) {
            writeError(response, ex);
        } finally {
            AuthenticatedUserHolder.clear();
        }
    }

    private boolean shouldSkip(HttpServletRequest request) {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        String path = request.getRequestURI();
        return WHITELIST.contains(path);
    }

    private String resolveToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.startsWith("Bearer ")) {
            return authorization.substring(7);
        }
        return request.getHeader("X-Token");
    }

    private void writeError(HttpServletResponse response, ResponseStatusException ex) throws IOException {
        if (response.isCommitted()) {
            return;
        }
        response.setStatus(ex.getStatusCode().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        String message = ex.getReason() != null ? ex.getReason() : "鉴权失败";
        response.getWriter().write("{\"message\":\"" + message + "\"}");
    }
}

