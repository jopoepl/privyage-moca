// "use client";

// import { useSession } from "@/hooks/useSession";
// import { useAgeVerification } from "@/hooks/useAgeVerification";
// import { useEffect, useState } from "react";

// export default function SimpleAgeVerification() {
//   const { isLoggedIn, isLoading, error, login, logout, user } = useSession();
//   const { isVerifying, isVerified, verifyAge, reset } = useAgeVerification();
//   const [loading, setLoading] = useState(false);
//   const [authToken, setAuthToken] = useState<string | null>(null);
//   const [config, setConfig] = useState<any | null>(null);
//   const [userAge, setUserAge] = useState<number>(18);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     // Only run when a valid age is provided
//     if (!userAge) return;

//     let cancelled = false;

//     const fetchAuthToken = async () => {
//       try {
//         setLoading(true);
//         setErrorMessage(null);

//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-age-credential`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             credentials: "include",
//             body: JSON.stringify({ requiredAge: userAge }),
//           },
//         );

//         if (!res.ok) throw new Error("Failed to fetch age verification token");

//         const { authToken, config } = await res.json();

//         if (!cancelled) {
//           setAuthToken(authToken);
//           setConfig(config);
//           console.log("🔐 Prefetched auth token:", authToken);
//           console.log("⚙️ Verification config:", config);
//         }
//       } catch (err) {
//         if (!cancelled) {
//           const msg =
//             err instanceof Error ? err.message : "Token prefetch failed";
//           setErrorMessage(msg);
//           console.error("Prefetch error:", msg);
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     fetchAuthToken();

//     return () => {
//       cancelled = true;
//     };
//   }, [userAge]);

//   // Show loading while service is initializing
//   if (isLoading) {
//     return (
//       <div className="p-4 bg-blue-100 rounded-lg">
//         <p>Initializing age verification service...</p>
//       </div>
//     );
//   }

//   const handleLogin = async () => {
//     try {
//       await login();
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       reset();
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const handleVerifyAge = async () => {
//     try {
//       await verifyAge(userAge, authToken, config);
//     } catch (error) {
//       console.error("Verification failed:", error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-4 bg-blue-100 rounded-lg">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-100 rounded-lg">
//         <p className="text-red-800">Error: {error}</p>
//         <button
//           onClick={handleLogin}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Try Login Again
//         </button>
//       </div>
//     );
//   }

//   if (!isLoggedIn) {
//     return (
//       <div className="p-4 bg-yellow-100 rounded-lg">
//         <h3 className="text-lg font-semibold mb-2">
//           Age Verification Required
//         </h3>
//         <p className="mb-4">Please log in to verify your age.</p>
//         <button
//           onClick={handleLogin}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Log In
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-green-100 rounded-lg">
//       <h3 className="text-lg font-semibold mb-2">Welcome, {user?.name}!</h3>
//       <p className="mb-4">You are logged in. Ready to verify your age.</p>

//       {!isVerified ? (
//         <div>
//           <button
//             onClick={handleVerifyAge}
//             disabled={isVerifying}
//             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
//           >
//             {isVerifying ? "Verifying..." : "Verify Age"}
//           </button>
//           <button
//             onClick={handleLogout}
//             className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p className="text-green-800 font-semibold">
//             ✅ Age verified successfully!
//           </p>
//           <button
//             onClick={reset}
//             className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//           >
//             Reset
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
