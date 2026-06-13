import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { PortfolioData } from "../data/types";
import { fetchPortfolioData } from "../services/portfolioApi";

interface PortfolioContextType {
  portfolio: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPortfolio() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPortfolioData();
        if (active) {
          setPortfolio(data);
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || "Failed to load portfolio data");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadPortfolio();

    return () => {
      active = false;
    };
  }, []);

  const value = {
    portfolio,
    isLoading,
    error,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
