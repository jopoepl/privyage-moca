"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useAirKitService } from "@/hooks/useAirKitService";

export const useAgeVerificationNew = () => {
  const { service, isReady } = useAirKitService();
  const { isUserLoggedIn, setIsUserVerified, setUserVerificationStatus, setJwtToken, jwtToken } = useUserStore();

  const [config] = useState({
    verifierDid: process.env.NEXT_PUBLIC_MOCA_VERIFIER_DID, // for context, not used yet
    programId: process.env.NEXT_PUBLIC_MOCA_VERIFIER_ID,
  });

  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isUserLoggedIn) {
    throw new Error("Login first to verify");
  }

  const verifyAge = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("service ready?", !!service, "programId:", config.programId);

      if (!isReady || !service) {
        throw new Error(
          "AirKit service not initialized yet. Try again in a moment.",
        );
      }
      
      let authToken: string | null = jwtToken ?? null;

      
      if(!jwtToken){
        
      // 1️⃣ Get JWT from backend
      const response = await fetch(`/api/generate-jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requiredAge: 21,
          scope: "issue verify",
        }),
      });
      
      const json = await response.json();

      authToken = json?.authToken ?? null;
      if (!authToken) throw new Error("Failed to get auth token from backend");
      setJwtToken(authToken)
      }



      // 2️⃣ Check config
      if (!config.programId) {
        throw new Error("Program ID is not defined");
      }
      
      if (!authToken) {
        throw new Error("Missing auth token before calling verifyCredential");
      }
      
      console.log("Starting verification service.......")

      // 3️⃣ Call AirKit verification
      const result = await service.verifyCredential({
        authToken,
        programId: config.programId,
      });

      console.log("✅ Verification result:", result);
      setVerificationResult(result);
      if (result.status === "Compliant") setIsUserVerified(true);
      setUserVerificationStatus(result.status);
      return result;
    } catch (err: any) {
      setError(err.message || "Verification failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verifyAge, verificationResult, loading, error };
};
