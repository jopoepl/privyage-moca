// "use client";

// import { useAirKitNew } from "@/hooks/useAirKitNew";
// import { useUserStore } from "@/store/useUserStore";

// export default function AirkitDemo() {
//   const { service, login, isReady, loading, error } = useAirKitNew();
//   const { user, isUserLoggedIn } = useUserStore();

//   if (loading) return <p>Initializing AirKit...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div>
//       {isUserLoggedIn ? (
//         <div className="group inline-block cursor-pointer text-sm text-gray-800 transition-all">
//           <p className="group-hover:hidden">✅ Logged in</p>
//           <p className="hidden group-hover:inline">
//             {user.abstractAccountAddress}
//           </p>
//         </div>
//       ) : (
//         <button
//           onClick={async () => {
//             const res = await login();
//             console.log("User logged in:", res);
//           }}
//           disabled={!isReady}
//           className="bg-blue-600 text-white px-3 py-2 rounded"
//         >
//           Login with AirKit
//         </button>
//       )}
//     </div>
//   );
// }
