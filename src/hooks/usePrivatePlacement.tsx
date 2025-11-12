"use client";

import { useEffect, useState } from "react";
import { fetchPrivatePlacement } from "@/services/privateplacementService";

export function usePrivatePlacement() {
  const [privatePlacementData, setPrivatePlacementData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPrivatePlacement();
        setPrivatePlacementData(data);
      } catch (err) {
        console.error("Error fetching private placement:", err);
        setError("Failed to fetch private placement data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { privatePlacementData, loading, error };
}
