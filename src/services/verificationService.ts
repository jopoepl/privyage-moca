// interface VerificationConfig {
//   verifierDid: string;
//   programId: string;
//   redirectUrlForIssuer: string;
//   requiredAge: number;
// }

// interface VerificationResponse {
//   status: "success" | "error";
//   message: string;
//   authToken?: string;
//   config?: VerificationConfig;
//   error?: string;
// }

// class VerificationService {
//   private baseUrl: string;

//   constructor() {
//     this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
//   }

//   async prepareAgeVerification(
//     requiredAge: number = 18
//   ): Promise<VerificationResponse> {
//     try {
//       const response = await fetch(
//         `${this.baseUrl}/api/auth/verify-age-credential`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include", // Important for cookies
//           body: JSON.stringify({
//             requiredAge,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         return {
//           status: "error",
//           message: data.message || "Verification preparation failed",
//           error: data.error,
//         };
//       }

//       return data;
//     } catch (error) {
//       return {
//         status: "error",
//         message: "Network error",
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//     }
//   }
// }

// export const verificationService = new VerificationService();
