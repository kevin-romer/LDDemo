import React, { createContext, useContext } from "react";
import axios from "axios";
import { DisasterApi } from "../sdk/DisasterApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const ApiContext = createContext<DisasterApi | null>(null);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const api = new DisasterApi(axiosInstance);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = (): DisasterApi => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
