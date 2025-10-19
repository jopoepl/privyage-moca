"use client";

import React from "react";
import { useAgeVerificationNew } from "@/hooks/useAgeVerificationNew";
import { useUserStore } from "@/store/useUserStore";
import { useAirKitService } from "@/hooks/useAirKitService";

const VerifyAgeButton: React.FC = () => {
  const { verifyAge, verificationResult, loading, error } =
    useAgeVerificationNew();
  const { isReady } = useAirKitService();
  const { isUserVerified } = useUserStore();

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4 border rounded-md shadow-sm">
      {isUserVerified ? (
        <p className="font-semibold mb-1 text-green-700">
          ✅ You are already verified:
        </p>
      ) : (
        <button
          onClick={verifyAge}
          disabled={!isReady || loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify Age"}
        </button>
      )}

      {verificationResult && !isUserVerified && (
        <div className="w-full text-left mt-2 p-2 bg-gray-100 rounded text-xs">
          <p className="font-semibold mb-1 text-green-700">
            ✅ Verification Result:
          </p>
          <pre className="overflow-x-auto">
            {JSON.stringify(verificationResult, null, 2)}
          </pre>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">⚠️ {error}</p>}
    </div>
  );
};

export default VerifyAgeButton;
