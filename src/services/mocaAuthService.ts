// interface MocaUser {
//   did: string;
//   name: string;
// }

// interface LoginResponse {
//   status: "success" | "error";
//   message: string;
//   user?: MocaUser;
//   error?: string;
// }

// interface LogoutResponse {
//   status: "success" | "error";
//   message: string;
// }

// class MocaAuthService {
//   private baseUrl: string;

//   constructor() {
//     this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
//   }

//   async login(user: MocaUser, accessToken: string): Promise<LoginResponse> {
//     try {
//       const response = await fetch(`${this.baseUrl}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // Important for cookies
//         body: JSON.stringify({
//           user,
//           accessToken,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return {
//           status: "error",
//           message: data.message || "Login failed",
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

//   async logout(): Promise<LogoutResponse> {
//     try {
//       const response = await fetch(`${this.baseUrl}/api/auth/logout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // Important for cookies
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return {
//           status: "error",
//           message: data.message || "Logout failed",
//         };
//       }

//       return data;
//     } catch (error) {
//       return {
//         status: "error",
//         message: "Network error",
//       };
//     }
//   }

//   async checkSession(): Promise<{ isLoggedIn: boolean; user?: MocaUser }> {
//     try {
//       const response = await fetch(`${this.baseUrl}/api/auth/profile`, {
//         method: "GET",
//         credentials: "include", // Important for cookies
//       });

//       const data = await response.json();

//       if (data.status === "success" && data.user) {
//         return {
//           isLoggedIn: true,
//           user: data.user,
//         };
//       }

//       return { isLoggedIn: false };
//     } catch (error) {
//       console.error("Session check error:", error);
//       return { isLoggedIn: false };
//     }
//   }
// }

// export const mocaAuthService = new MocaAuthService();
