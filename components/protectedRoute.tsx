"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me"); // cek login backend
        setAuthenticated(true);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
