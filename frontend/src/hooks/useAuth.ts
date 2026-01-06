import { useEffect, useState } from "react";
import api from "../services/api";
import type { User } from "../types/auth";


interface UseAuthResult {
  user: User | null;
  loading: boolean;
}

export const useAuth = (): UseAuthResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get<User>("/protected/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
};
