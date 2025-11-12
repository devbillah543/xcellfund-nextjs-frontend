"use client";
import { useEffect, useState } from "react";
import { fetchContactUs } from "@/services/contactusService";

export function useContactUs() {
  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchContactUs();
        setContactData(data);
      } catch (err) {
        setError("Failed to fetch contact data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { contactData, loading, error };
}
