"use client";

import { useCallback } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useAirKitService } from "@/hooks/useAirKitService";
import type { AirLoginResult } from "@mocanetwork/airkit";

export const useAirKitNew = () => {
  const { service, isReady, loading, error } = useAirKitService();
  const { setUser, setJwtToken } = useUserStore();

  const login = useCallback(async () => {
    if (!isReady || !service) {
      throw new Error("AirKit service not initialized yet");
    }

    try {
      const result: AirLoginResult = await service.login();
      setUser(result);
      return result;
    } catch (err: any) {
      console.error("Login failed:", err);
      throw err;
    }
  }, [service, isReady, setUser]);

  const logout = useCallback(async () => {
    if (!isReady || !service) {
      throw new Error("AirKit service not initialized yet");
    }

    try {
      await service.logout();
      console.log("👋 USER LOGGED OUT");
      setUser(null);
    } catch (err: any) {
      console.error("Logout failed:", err);
      throw err;
    }
  }, [service, isReady, setUser]);

  return {
    service,
    loading,
    error,
    login,
    logout,
    isReady,
  };
};
