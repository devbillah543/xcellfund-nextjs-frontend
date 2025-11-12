"use client";

import { useEffect, useState } from "react";
import { fetchSeriesFunding } from "@/services/seriesfundingService";

export function useSeriesFunding() {
  const [seriesFundingData, setSeriesFundingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchSeriesFunding();
        setSeriesFundingData(data);
      } catch (err) {
        console.error("Error fetching series funding:", err);
        setError("Failed to fetch series funding data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { seriesFundingData, loading, error };
}
