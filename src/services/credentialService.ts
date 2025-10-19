// interface CredentialConfig {
//   issuerDid: string;
//   credentialId: string;
//   credentialSubject: {
//     age: number;
//     verifiedAt: string;
//     verifiedBy: string;
//   };
// }

// interface IssueCredentialResponse {
//   status: "success" | "error";
//   message: string;
//   authToken?: string;
//   config?: CredentialConfig;
//   error?: string;
// }

// class CredentialService {
//   private baseUrl: string;

//   constructor() {
//     this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
//   }

//   async prepareAgeCredential(
//     age: number,
//     credentialId: string
//   ): Promise<IssueCredentialResponse> {
//     try {
//       const response = await fetch(
//         `${this.baseUrl}/api/auth/issue-age-credential`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include", // Important for cookies
//           body: JSON.stringify({
//             age,
//             credentialId,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         return {
//           status: "error",
//           message: data.message || "Failed to prepare credential",
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

// export const credentialService = new CredentialService();
