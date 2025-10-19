// "use client";

// import { useState, useEffect } from "react";
// import { AirService, BUILD_ENV } from "@mocanetwork/airkit";

// interface AirKitAuthState {
//   service: AirService | null;
//   isInitialized: boolean;
//   isLoggedIn: boolean;
//   isLoading: boolean;
//   error: string | null;
//   user: {
//     did: string;
//     name: string;
//   } | null;
// }

// export const useAirKitAuth = () => {
//   const [state, setState] = useState<AirKitAuthState>({
//     service: null,
//     isInitialized: false,
//     isLoggedIn: false,
//     isLoading: false,
//     error: null,
//     user: null,
//   });

//   // Initialize the service
//   useEffect(() => {
//     const initService = async () => {
//       try {
//         console.log("Initializing AirKit service...");
//         setState((prev) => ({ ...prev, isLoading: true, error: null }));

//         const partnerId =
//           process.env.NEXT_PUBLIC_MOCA_PARTNER_ID ||
//           "8438b5e0-b143-495d-ab2f-2a48aead495b";
//         console.log("Using partner ID:", partnerId);
//         console.log("BUILD_ENV:", BUILD_ENV);

//         const service = new AirService({
//           partnerId: partnerId,
//         });

//         console.log("Service created, initializing...");
//         await service.init({
//           buildEnv: BUILD_ENV.SANDBOX,
//           enableLogging: true,
//           skipRehydration: false,
//         });

//         console.log("Service initialized successfully");
//         setState((prev) => ({
//           ...prev,
//           service,
//           isInitialized: true,
//           isLoggedIn: service.isLoggedIn,
//           isLoading: false,
//           user: service.isLoggedIn
//             ? {
//                 did: service.loginResult?.id || "unknown",
//                 name: "User",
//               }
//             : null,
//         }));
//       } catch (error) {
//         console.error("Failed to initialize AirKit:", error);
//         setState((prev) => ({
//           ...prev,
//           isInitialized: true,
//           isLoading: false,
//           error:
//             error instanceof Error ? error.message : "Failed to initialize",
//         }));
//       }
//     };

//     initService();
//   }, []);

//   const login = async () => {
//     if (!state.service) {
//       if (!state.isInitialized) {
//         throw new Error("Service is still initializing, please wait...");
//       }
//       throw new Error("Service not initialized");
//     }

//     setState((prev) => ({ ...prev, isLoading: true, error: null }));

//     try {
//       const loggedInResult = await state.service.login();

//       if (loggedInResult.isLoggedIn) {
//         setState((prev) => ({
//           ...prev,
//           isLoggedIn: true,
//           isLoading: false,
//           user: {
//             did: loggedInResult.id,
//             name: "User",
//           },
//           error: null,
//         }));

//         return loggedInResult;
//       } else {
//         throw new Error("Login was cancelled or failed");
//       }
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Login failed";
//       setState((prev) => ({
//         ...prev,
//         isLoading: false,
//         error: errorMessage,
//       }));
//       throw error;
//     }
//   };

//   const logout = async () => {
//     if (!state.service) return;

//     try {
//       await state.service.logout();
//       setState((prev) => ({
//         ...prev,
//         isLoggedIn: false,
//         user: null,
//         error: null,
//       }));
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const getAccessToken = async () => {
//     if (!state.service) return null;

//     try {
//       const result = await state.service.getAccessToken();
//       return result.token;
//     } catch (error) {
//       console.error("Failed to get access token:", error);
//       return null;
//     }
//   };

//   return {
//     ...state,
//     login,
//     logout,
//     getAccessToken,
//   };
// };
