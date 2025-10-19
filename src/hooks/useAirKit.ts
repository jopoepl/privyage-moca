// "use client";

// import { useState, useEffect } from "react";
// import { AirService, BUILD_ENV } from "@mocanetwork/airkit";

// interface AirKitState {
//   service: AirService | null;
//   isInitialized: boolean;
//   isLoggedIn: boolean;
//   isLoading: boolean;
//   error: string | null;
// }

// export const useAirKit = () => {
//   const [state, setState] = useState<AirKitState>({
//     service: null,
//     isInitialized: false,
//     isLoggedIn: false,
//     isLoading: false,
//     error: null,
//   });

//   // Initialize the service
//   useEffect(() => {
//     const initService = async () => {
//       try {
//         const service = new AirService({
//           partnerId:
//             process.env.NEXT_PUBLIC_MOCA_PARTNER_ID || "your-partner-id",
//         });

//         await service.init({
//           buildEnv: BUILD_ENV.SANDBOX,
//           enableLogging: true,
//           skipRehydration: false,
//         });

//         setState((prev) => ({
//           ...prev,
//           service,
//           isInitialized: true,
//           isLoggedIn: service.isLoggedIn,
//         }));
//       } catch (error) {
//         console.error("Failed to initialize AirKit:", error);
//         setState((prev) => ({
//           ...prev,
//           isInitialized: true,
//           error:
//             error instanceof Error ? error.message : "Failed to initialize",
//         }));
//       }
//     };

//     initService();
//   }, []);

//   const login = async () => {
//     if (!state.service) {
//       throw new Error("Service not initialized");
//     }

//     setState((prev) => ({ ...prev, isLoading: true, error: null }));

//     try {
//       const loggedInResult = await state.service.login();

//       setState((prev) => ({
//         ...prev,
//         isLoggedIn: loggedInResult.isLoggedIn,
//         isLoading: false,
//         error: loggedInResult.isLoggedIn ? null : "Login failed",
//       }));

//       return loggedInResult;
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
