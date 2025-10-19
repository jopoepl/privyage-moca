// "use client";

// import { useState } from "react";
// import { useSession } from "./useSession";

// interface VerificationState {
//   isVerifying: boolean;
//   isVerified: boolean;
//   error: string | null;
//   result: any | null;
// }

// export const useAgeVerification = () => {
//   const { service, isLoggedIn } = useSession();
//   const [state, setState] = useState<VerificationState>({
//     isVerifying: false,
//     isVerified: false,
//     error: null,
//     result: null,
//   });

//   const verifyAge = async (
//     requiredAge: number = 18,
//     authToken: string,
//     config: any,
//   ) => {
//     if (!isLoggedIn) {
//       throw new Error("Please log in first");
//     }

//     if (!service) {
//       throw new Error("AirKit service not available");
//     }

//     setState((prev) => ({ ...prev, isVerifying: true, error: null }));

//     try {
//       // Use AirKit to verify credential
//       const verificationParams = {
//         authToken: authToken,
//         programId: config.programId,
//       };

//       const result = await service.verifyCredential(verificationParams);
//       console.log("Verification result in Age Verification Hook:", result);

//       const verificationResult = {
//         verified: result.status === "Compliant",
//         status: result.status,
//         payload: result.payload,
//       };

//       setState((prev) => ({
//         ...prev,
//         isVerifying: false,
//         isVerified: verificationResult.verified,
//         result: verificationResult,
//         error: verificationResult.verified ? null : "Age verification failed",
//       }));

//       return verificationResult;
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Verification failed";
//       setState((prev) => ({
//         ...prev,
//         isVerifying: false,
//         error: errorMessage,
//       }));
//       throw error;
//     }
//   };

//   const reset = () => {
//     setState({
//       isVerifying: false,
//       isVerified: false,
//       error: null,
//       result: null,
//     });
//   };

//   return {
//     ...state,
//     verifyAge,
//     reset,
//     isLoggedIn,
//   };
// };
