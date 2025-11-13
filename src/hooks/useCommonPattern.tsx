"use client";

import { useEffect, useState } from "react";
import { fetchCommonData, CommonData } from "@/services/commonService";

interface UseCommonDataReturn<T = CommonData> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * ✅ Generic React hook to fetch any Strapi single-type data
 *
 * Usage:
 * const { data, loading, error } = useCommonPattern("seedInvestment");
 */
export function useCommonPattern<T extends CommonData = CommonData>(key: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!key) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 👇 Explicitly tell TypeScript that fetchCommonData returns type T
        const result = await fetchCommonData<T>(key as any);
        setData(result);
      } catch (err) {
        console.error(`Error fetching ${key}:`, err);
        setError(`Failed to fetch ${key} data`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return { data, loading, error } as UseCommonDataReturn<T>;
}
