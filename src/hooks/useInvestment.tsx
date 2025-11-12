"use client";
import { useEffect, useState } from "react";
import { fetchInvestment } from "@/services/investmentService";

export function useInvestment() {
  const [investmentData, setInvestmentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchInvestment();
        setInvestmentData(data);
      } catch (err) {
        setError("Failed to fetch investment data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { investmentData, loading, error };
}
