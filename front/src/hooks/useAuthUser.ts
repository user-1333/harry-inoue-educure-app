import type { User } from "@/components/schema/User";
import { request } from "@/lib/ApiFetch";
import { getTokenFromCookie } from "@/lib/cookie";
import { useEffect, useState } from "react";

// hooks/useAuthUser.ts
export function useAuthUser() {
    const token = getTokenFromCookie();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!token) {
            window.location.href = "/auth/signin";
            return;
        }

        request<User>("user/me", { method: "GET" })
            .then(setUser)
            .catch(() => {
                window.location.href = "/auth/signin";
            });
    }, [token]);

    return user;
}