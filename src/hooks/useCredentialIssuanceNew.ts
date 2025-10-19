"use client";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useAirKitService } from "@/hooks/useAirKitService";

export const useCredentialIssuanceNew = () => {
  const { isUserLoggedIn } = useUserStore();
  const { service, isReady } = useAirKitService();
  const { setIsUserVerified, setUserVerificationStatus } = useUserStore(); // once issue is complete - we can set user as verified!!

  const [config] = useState({
    issuerDid: process.env.NEXT_PUBLIC_MOCA_ISSUER_DID,
    programId: process.env.NEXT_PUBLIC_MOCA_CREDENTIAL_ID,
  });

  const [credentialStatus, setCredentialStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isUserLoggedIn) {
    throw new Error("Login first to issue Credential");
  }

  const issueCredential = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("service ready?", !!service, "programId:", config.programId);

      if (!isReady || !service) {
        throw new Error(
          "AirKit service not initialized yet. Try again in a moment.",
        );
      }

      // 1️⃣ Get JWT from backend
      const response = await fetch(`/api/generate-jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requiredAge: 21,
          scope: "issue verify",
        }),
      });

      const { authToken } = await response.json();
      if (!authToken) throw new Error("Failed to get auth token from backend");

      if (!authToken) throw new Error("Failed to get token from backend");

      console.log(
        authToken,
        "Token generated from backend, proceeding to verification...",
      );

      // 2️⃣ Check config
      if (!config.programId) {
        throw new Error("Program ID is not defined");
      }
      if (!config.issuerDid) {
        throw new Error("Issuer DID is not defined");
      }

      const credentialSubject = {
        age: 21,
      };

      // 3️⃣ Call AirKit verification
      const result = await service.issueCredential({
        authToken: authToken,
        issuerDid: config.issuerDid,
        credentialId: config.programId,
        credentialSubject: credentialSubject,
      });

      setCredentialStatus(result);
      setIsUserVerified(true);
      setUserVerificationStatus("Compliant");
      return result;
    } catch (err: any) {
      setError(err.message || "Verification failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { issueCredential, credentialStatus, loading, error };
};
