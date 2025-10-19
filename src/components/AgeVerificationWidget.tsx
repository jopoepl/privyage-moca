// "use client";

// import { useState, useEffect } from "react";
// import { useMocaAuth } from "@/hooks/useMocaAuth";
// import { useCredentialIssuance } from "@/hooks/useCredentialIssuance";
// import { useCredentialVerification } from "@/hooks/useCredentialVerification";
// import { mocaAuthService } from "@/services/mocaAuthService";

// interface AgeVerificationWidgetProps {
//   onVerificationAction: (verified: boolean, age: number) => void;
// }

// export default function AgeVerificationWidget({
//   onVerificationAction,
// }: AgeVerificationWidgetProps) {
//   const [age, setAge] = useState<number | "">("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!age || age < 1 || age > 120) {
//       setError("Please enter a valid age between 1 and 120");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Generate test token
//       const tokenResponse = await fetch("/api/verify-age/generate-test-token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ age }),
//       });

//       if (!tokenResponse.ok) {
//         throw new Error("Failed to generate test token");
//       }

//       const { token } = await tokenResponse.json();

//       // Verify age with the token
//       const verifyResponse = await fetch("/api/verify-age/verify", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token, requiredAge: 18 }),
//       });

//       if (!verifyResponse.ok) {
//         throw new Error("Age verification failed");
//       }

//       const result = await verifyResponse.json();
//       onVerification(result.verified, result.age);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//       onVerification(false, 0);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label
//           htmlFor="age"
//           className="block text-sm font-medium text-gray-700 mb-2"
//         >
//           Enter your age:
//         </label>
//         <input
//           type="number"
//           id="age"
//           value={age}
//           onChange={(e) => setAge(Number(e.target.value))}
//           min="1"
//           max="120"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Enter your age"
//           required
//         />
//       </div>

//       {error && (
//         <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
//           {error}
//         </div>
//       )}

//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? "Verifying..." : "Verify Age"}
//       </button>

//       <div className="text-xs text-gray-500 text-center">
//         This is a demo. In production, age verification would use secure
//         identity verification methods.
//       </div>
//     </form>
//   );
// }
