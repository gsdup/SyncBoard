package com.syncboard.backend.security;

public final class AuthenticatedUserHolder {

    public static final String REQUEST_ATTRIBUTE = AuthenticatedUserHolder.class.getName() + ".USER";

    private static final ThreadLocal<AuthenticatedUser> CONTEXT = new ThreadLocal<>();

    private AuthenticatedUserHolder() {
    }

    public static void set(AuthenticatedUser user) {
        CONTEXT.set(user);
    }

    public static AuthenticatedUser get() {
        return CONTEXT.get();
    }

    public static void clear() {
        CONTEXT.remove();
    }
}

