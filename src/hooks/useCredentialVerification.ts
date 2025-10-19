// "use client";

// import { useState } from "react";
// import { AirService } from "@mocanetwork/airkit";
// import { verificationService } from "@/services/verificationService";

// interface VerificationResult {
//   status: string;
//   payload?: any;
//   isCompliant?: boolean;
//   isExpired?: boolean;
//   isRevoked?: boolean;
// }

// interface CredentialVerificationState {
//   isLoading: boolean;
//   isSuccess: boolean;
//   error: string | null;
//   verificationResult: VerificationResult | null;
// }

// export const useCredentialVerification = (airService: AirService | null) => {
//   const [state, setState] = useState<CredentialVerificationState>({
//     isLoading: false,
//     isSuccess: false,
//     error: null,
//     verificationResult: null,
//   });

//   const verifyAgeCredential = async (
//     requiredAge: number = 18
//   ): Promise<boolean> => {
//     if (!airService) {
//       setState((prev) => ({
//         ...prev,
//         error: "AIR Service not initialized",
//       }));
//       return false;
//     }

//     setState({
//       isLoading: true,
//       isSuccess: false,
//       error: null,
//       verificationResult: null,
//     });

//     try {
//       // Step 1: Prepare verification from backend
//       const prepareResult = await verificationService.prepareAgeVerification(
//         requiredAge
//       );

//       if (
//         prepareResult.status !== "success" ||
//         !prepareResult.authToken ||
//         !prepareResult.config
//       ) {
//         throw new Error(
//           prepareResult.error || "Failed to prepare verification"
//         );
//       }

//       // Step 2: Verify credential using Moca AIRKit
//       const verificationParams = {
//         authToken: prepareResult.authToken,
//         programId: prepareResult.config.programId,
//         redirectUrl: prepareResult.config.redirectUrlForIssuer,
//       };

//       console.log(
//         "Moca AIRKit verification parameters:",
//         JSON.stringify(verificationParams, null, 2)
//       );

//       const result = await airService.verifyCredential(verificationParams);

//       console.log("Verification result:", result);

//       // Process verification result
//       const verificationResult: VerificationResult = {
//         status: result.status || "unknown",
//         payload: result.payload,
//         isCompliant: result.status === "Compliant",
//         isExpired: result.status === "Expired",
//         isRevoked: result.status === "Revoked",
//       };

//       setState({
//         isLoading: false,
//         isSuccess: true,
//         error: null,
//         verificationResult,
//       });

//       return verificationResult.isCompliant || false;
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error
//           ? error.message
//           : "Credential verification failed";
//       setState({
//         isLoading: false,
//         isSuccess: false,
//         error: errorMessage,
//         verificationResult: null,
//       });
//       return false;
//     }
//   };

//   const reset = () => {
//     setState({
//       isLoading: false,
//       isSuccess: false,
//       error: null,
//       verificationResult: null,
//     });
//   };

//   return {
//     ...state,
//     verifyAgeCredential,
//     reset,
//   };
// };
