"use client";

import { checkSession, getUserProfile } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true, якщо сторінка приватна
}

export default function AuthProvider({
  children,
  requireAuth = false,
}: AuthProviderProps) {
  const setAuthUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const authenticated = await checkSession();

        if (!authenticated) {
          clearIsAuthenticated();
          if (requireAuth) router.replace("/sign-in");
          return;
        }

        const profile = await getUserProfile();
        if (profile) setAuthUser(profile);
      } catch (err) {
        console.error("Error during auth verification:", err);
        clearIsAuthenticated();
        if (requireAuth) router.replace("/sign-in");
      } finally {
        setChecking(false);
      }
    };

    verifySession();
  }, [setAuthUser, clearIsAuthenticated, router, requireAuth]);

  if (checking) return <p>Перевіряємо авторизацію користувача...</p>;

  return <>{children}</>;
}
