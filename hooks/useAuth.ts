import { useMutation } from "@tanstack/react-query";
import { useRef, useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";

// ─── Types ────────────────────────────────────────────────────────────

interface RegisterPayload {
    name: string;
    email?: string;
    phone?: string;
    password: string;
}

interface LoginPayload {
    email?: string;
    phone?: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: { id: string; name: string };
}

class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

// ─── Mock API Functions ───────────────────────────────────────────────

const MOCK_DELAY = 1200;

const mockRegisterApi = async (data: RegisterPayload): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));

    // EP-R3: Simulate 409 Conflict for duplicate accounts
    const identifier = data.email || data.phone;
    if (
        identifier === "test@exists.com" ||
        identifier === "+959111111111"
    ) {
        throw new ApiError("This email/phone is already registered.", 409);
    }

    return {
        token: "mock-register-token-" + Date.now(),
        user: { id: "user-1", name: data.name },
    };
};

const mockLoginApi = async (data: LoginPayload): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, MOCK_DELAY));

    const identifier = data.email || data.phone;

    // Simulate network error for special trigger
    if (identifier === "network@error.com" || identifier === "+959000000000") {
        throw new ApiError("Can't connect right now. Please try again.", 0);
    }

    // EP-L1: 404 Account not found
    if (identifier === "notfound@test.com" || identifier === "+959999999999") {
        throw new ApiError("Account not found. Create an account.", 404);
    }

    // EP-L2: 401 Wrong password
    const validCredentials =
        (data.email === "test@test.com" && data.password === "password123") ||
        (data.phone === "+959123456789" && data.password === "password123");

    if (!validCredentials) {
        throw new ApiError("Incorrect password. Try again.", 401);
    }

    return {
        token: "mock-login-token-" + Date.now(),
        user: { id: "user-1", name: "Test User" },
    };
};

// ─── Hooks ────────────────────────────────────────────────────────────

export function useRegister() {
    return useMutation<AuthResponse, ApiError, RegisterPayload>({
        mutationFn: mockRegisterApi,
    });
}

export function useLogin() {
    const setToken = useAuthStore((s) => s.setToken);
    const failCountRef = useRef(0);
    const [isLockedOut, setIsLockedOut] = useState(false);
    const [lockoutMessage, setLockoutMessage] = useState("");

    const resetLockout = useCallback(() => {
        failCountRef.current = 0;
        setIsLockedOut(false);
        setLockoutMessage("");
    }, []);

    const mutation = useMutation<AuthResponse, ApiError, LoginPayload>({
        mutationFn: async (data) => {
            if (isLockedOut) {
                throw new ApiError("Too many attempts. Try again later.", 429);
            }
            return mockLoginApi(data);
        },
        onSuccess: (data) => {
            failCountRef.current = 0;
            setToken(data.token);
        },
        onError: (error) => {
            // EP-L4: Network error (status 0)
            if (error.status === 0) return;

            // EP-L3: Track failed attempts for 401 errors
            if (error.status === 401) {
                failCountRef.current += 1;
                if (failCountRef.current >= 3) {
                    setIsLockedOut(true);
                    setLockoutMessage("Too many attempts. Try again later.");
                    setTimeout(() => {
                        resetLockout();
                    }, 60000);
                }
            }
        },
    });

    return {
        ...mutation,
        isLockedOut,
        lockoutMessage,
    };
}
