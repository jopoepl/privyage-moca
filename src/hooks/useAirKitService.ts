"use client";
import { useEffect, useState } from "react";
import { initAirkit, getAirkit } from "@/services/airkitService";

export const useAirKitService = () => {
  const [service, setService] = useState(getAirkit());
  const [loading, setLoading] = useState(!service);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!service) {
      (async () => {
        try {
          const air = await initAirkit(
            process.env.NEXT_PUBLIC_MOCA_PARTNER_ID!,
          );
          setService(air);
        } catch (err: any) {
          setError(err.message || "Failed to initialize AirKit");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [service]);

  return { service, loading, error, isReady: !!service && !loading };
};
