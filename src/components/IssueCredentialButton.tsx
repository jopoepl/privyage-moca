"use client";

import React from "react";
import { useUserStore } from "@/store/useUserStore";
import { useCredentialIssuanceNew } from "@/hooks/useCredentialIssuanceNew";
import { useAirKitService } from "@/hooks/useAirKitService";

const IssueCredentialButton: React.FC = () => {
  const { isUserVerified } = useUserStore();
  const { issueCredential, credentialStatus, loading, error } =
    useCredentialIssuanceNew();
  const { isReady } = useAirKitService();

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4 border rounded-md shadow-sm">
      {isUserVerified ? (
        <p className="font-semibold mb-1 text-green-700">
          ✅ You are already verified
        </p>
      ) : (
        <button
          onClick={issueCredential}
          disabled={!isReady || loading}
          className={`px-4 py-2 rounded text-white transition-colors ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Issuing Credential..." : "Issue Credential"}
        </button>
      )}

      {credentialStatus && !isUserVerified && (
        <div className="w-full text-left mt-2 p-2 bg-gray-100 rounded text-xs">
          <p className="font-semibold mb-1 text-green-700">
            ✅ Issuance Result:
          </p>
          <pre className="overflow-x-auto">
            {JSON.stringify(credentialStatus, null, 2)}
          </pre>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">⚠️ {error}</p>}
    </div>
  );
};

export default IssueCredentialButton;
