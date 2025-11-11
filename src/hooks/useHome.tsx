"use client";
import { useEffect, useState } from "react";
import { fetchHome } from "@/services/homeService";

export function useHome() {
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchHome();
        setHomeData(data);
      } catch (err) {
        setError("Failed to fetch home data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { homeData, loading, error };
}
