import type { User } from "@/components/schema/User";
import { request } from "@/lib/ApiFetch";
import { useEffect, useState } from "react";

// hooks/useAuthUser.ts
export function useAuthUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        request<User>("user/me", { method: "GET" })
            .then(setUser)
            .catch(() => {});
    }, []);

    return user;
}

export function useAuthUserAll() {
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        request<User[]>("user/all", { method: "GET" })
            .then(setUsers)
            .catch(() => {});
    }, []);

    return users;
}