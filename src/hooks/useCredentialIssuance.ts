// "use client";

// import { useState } from "react";
// import { AirService } from "@mocanetwork/airkit";
// import { credentialService } from "@/services/credentialService";

// interface CredentialIssuanceState {
//   isLoading: boolean;
//   isSuccess: boolean;
//   error: string | null;
// }

// export const useCredentialIssuance = (airService: AirService | null) => {
//   const [state, setState] = useState<CredentialIssuanceState>({
//     isLoading: false,
//     isSuccess: false,
//     error: null,
//   });

//   const issueAgeCredential = async (
//     age: number,
//     credentialId: string
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
//     });

//     try {
//       console.log("Frontend sending age:", age, "credentialId:", credentialId);

//       // Step 1: Prepare credential from backend
//       const prepareResult = await credentialService.prepareAgeCredential(
//         age,
//         credentialId
//       );

//       if (
//         prepareResult.status !== "success" ||
//         !prepareResult.authToken ||
//         !prepareResult.config
//       ) {
//         throw new Error(prepareResult.error || "Failed to prepare credential");
//       }

//       // Step 2: Issue credential using Moca AIRKit
//       const issuanceParams = {
//         authToken: prepareResult.authToken,
//         credentialId: prepareResult.config.credentialId,
//         credentialSubject: prepareResult.config.credentialSubject,
//         issuerDid: prepareResult.config.issuerDid,
//       };

//       console.log(
//         "Moca AIRKit issuance parameters:",
//         JSON.stringify(issuanceParams, null, 2)
//       );
//       console.log("AuthToken length:", prepareResult.authToken?.length);
//       console.log("CredentialId:", prepareResult.config.credentialId);
//       console.log("IssuerDid:", prepareResult.config.issuerDid);
//       console.log(
//         "CredentialSubject:",
//         JSON.stringify(prepareResult.config.credentialSubject, null, 2)
//       );

//       // Check for undefined values
//       Object.entries(issuanceParams).forEach(([key, value]) => {
//         if (value === undefined || value === null) {
//           console.error(`Undefined parameter: ${key} = ${value}`);
//         }
//       });

//       await airService.issueCredential(issuanceParams);

//       setState({
//         isLoading: false,
//         isSuccess: true,
//         error: null,
//       });

//       return true;
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Credential issuance failed";
//       setState({
//         isLoading: false,
//         isSuccess: false,
//         error: errorMessage,
//       });
//       return false;
//     }
//   };

//   const reset = () => {
//     setState({
//       isLoading: false,
//       isSuccess: false,
//       error: null,
//     });
//   };

//   return {
//     ...state,
//     issueAgeCredential,
//     reset,
//   };
// };
