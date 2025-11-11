'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { fetchGlobal, GlobalData } from "@/services/globalService";

interface GlobalContextProps {
  global: GlobalData | null;
  loading: boolean;
  error: string | null;
}

const GlobalContext = createContext<GlobalContextProps>({
  global: null,
  loading: true,
  error: null,
});

export const useGlobal = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [global, setGlobal] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGlobal()
      .then((data) => setGlobal(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GlobalContext.Provider value={{ global, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
};
