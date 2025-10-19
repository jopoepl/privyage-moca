// "use client";

// import { useState, useEffect } from "react";
// import { AirService, BUILD_ENV } from "@mocanetwork/airkit";

// interface MocaUser {
//   did: string;
//   name: string;
// }

// interface MocaAuthState {
//   isInitialized: boolean;
//   isLoggedIn: boolean;
//   user: MocaUser | null;
//   isLoading: boolean;
//   error: string | null;
// }

// export const useMocaAuth = () => {
//   const [authState, setAuthState] = useState<MocaAuthState>({
//     isInitialized: false,
//     isLoggedIn: false,
//     user: null,
//     isLoading: false,
//     error: null,
//   });

//   const [service, setService] = useState<AirService | null>(null);

//   // Initialize Moca AIRKit service
//   useEffect(() => {
//     const initService = async () => {
//       try {
//         const airService = new AirService({
//           partnerId:
//             process.env.NEXT_PUBLIC_MOCA_PARTNER_ID || "your-partner-id",
//         });

//         await airService.init({
//           buildEnv: BUILD_ENV.SANDBOX,
//           enableLogging: true,
//           skipRehydration: false,
//         });

//         setService(airService);
//         setAuthState((prev) => ({
//           ...prev,
//           isInitialized: true,
//           isLoggedIn: airService.isLoggedIn,
//           user: airService.isLoggedIn
//             ? {
//                 did: airService.loginResult.id,
//                 name: "User", // We'll get this from getUserInfo if needed
//               }
//             : null,
//         }));
//       } catch (error) {
//         console.error("Failed to initialize Moca AIRKit:", error);
//         setAuthState((prev) => ({
//           ...prev,
//           isInitialized: true,
//           error:
//             error instanceof Error ? error.message : "Failed to initialize",
//         }));
//       }
//     };

//     initService();
//   }, []);

//   const login = async (): Promise<{
//     success: boolean;
//     user?: MocaUser;
//     error?: string;
//   }> => {
//     if (!service) {
//       return { success: false, error: "Service not initialized" };
//     }

//     setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

//     try {
//       const result = await service.login();

//       if (result.isLoggedIn) {
//         const user: MocaUser = {
//           did: result.id,
//           name: "User", // We'll get this from getUserInfo if needed
//         };

//         setAuthState((prev) => ({
//           ...prev,
//           isLoggedIn: true,
//           user: user,
//           isLoading: false,
//           error: null,
//         }));

//         return { success: true, user: user };
//       } else {
//         setAuthState((prev) => ({
//           ...prev,
//           isLoading: false,
//           error: "Login failed",
//         }));

//         return { success: false, error: "Login failed" };
//       }
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Login failed";
//       setAuthState((prev) => ({
//         ...prev,
//         isLoading: false,
//         error: errorMessage,
//       }));

//       return { success: false, error: errorMessage };
//     }
//   };

//   const logout = async (): Promise<void> => {
//     if (!service) return;

//     try {
//       await service.logout();
//       setAuthState((prev) => ({
//         ...prev,
//         isLoggedIn: false,
//         user: null,
//         error: null,
//       }));
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const getAccessToken = async (): Promise<string | null> => {
//     if (!service) return null;

//     try {
//       const result = await service.getAccessToken();
//       return result.token;
//     } catch (error) {
//       console.error("Failed to get access token:", error);
//       return null;
//     }
//   };

//   return {
//     ...authState,
//     service,
//     login,
//     logout,
//     getAccessToken,
//   };
// };
