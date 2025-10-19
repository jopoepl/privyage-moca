// "use client";

// import { useState, useEffect } from "react";
// import { useAirKitAuth } from "./useAirKitAuth";

// interface SessionState {
//   isLoggedIn: boolean;
//   isLoading: boolean;
//   error: string | null;
//   user: {
//     did: string;
//     name: string;
//   } | null;
// }

// export const useSession = () => {
//   const {
//     service,
//     isLoggedIn: airKitLoggedIn,
//     login: airKitLogin,
//     logout: airKitLogout,
//     getAccessToken,
//     isLoading: airKitLoading,
//     error: airKitError,
//   } = useAirKitAuth();

//   const [sessionState, setSessionState] = useState<SessionState>({
//     isLoggedIn: false,
//     isLoading: false,
//     error: null,
//     user: null,
//   });

//   // Check if user has a valid session on mount
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
//           {
//             credentials: "include",
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setSessionState({
//             isLoggedIn: true,
//             isLoading: false,
//             error: null,
//             user: data.user,
//           });
//         } else {
//           setSessionState({
//             isLoggedIn: false,
//             isLoading: false,
//             error: null,
//             user: null,
//           });
//         }
//       } catch (error) {
//         setSessionState({
//           isLoggedIn: false,
//           isLoading: false,
//           error: null,
//           user: null,
//         });
//       }
//     };

//     checkSession();
//   }, []);

//   const login = async () => {
//     setSessionState((prev) => ({ ...prev, isLoading: true, error: null }));

//     try {
//       // Use AirKit to login
//       const loginResult = await airKitLogin();

//       if (loginResult.isLoggedIn) {
//         // Get access token from AirKit
//         const accessToken = await getAccessToken();

//         if (!accessToken) {
//           throw new Error("Failed to get access token");
//         }

//         // Send login data to backend to create session
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify({
//               user: {
//                 did: loginResult.id,
//                 name: "User",
//               },
//               accessToken: accessToken,
//             }),
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setSessionState({
//             isLoggedIn: true,
//             isLoading: false,
//             error: null,
//             user: data.user,
//           });
//         } else {
//           throw new Error("Failed to create session");
//         }
//       }
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Login failed";
//       setSessionState((prev) => ({
//         ...prev,
//         isLoading: false,
//         error: errorMessage,
//       }));
//       throw error;
//     }
//   };

//   const logout = async () => {
//     setSessionState((prev) => ({ ...prev, isLoading: true }));

//     try {
//       // Logout from AirKit
//       await airKitLogout();

//       // Logout from backend session
//       await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });

//       setSessionState({
//         isLoggedIn: false,
//         isLoading: false,
//         error: null,
//         user: null,
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//       setSessionState((prev) => ({
//         ...prev,
//         isLoading: false,
//         error: "Logout failed",
//       }));
//     }
//   };

//   return {
//     ...sessionState,
//     login,
//     logout,
//     service, // Expose AirKit service for verification/issuance
//   };
// };
