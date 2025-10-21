"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import VerifyButton from "@/components/VerifyButton";
import IssueCredentialButton from "@/components/IssueCredentialButton";
import { useAirKitNew } from "@/hooks/useAirKitNew";


/**
 * DemoPage (homepage style)
 * - Background uses the "Featured Bottle" gradient color
 * - Page is shown as sections (hero, gallery, regions, notes, events, footer)
 * - Page content is blurred while user is NOT verified
 * - Overlay widget shows verification actions and is hidden as soon as verified
 *
 * Public images: Unsplash (free to use). Replace with your own assets if needed.
 */

export default function DemoPage() {
  const { user, isUserLoggedIn, isUserVerified, userVerificationStatus, setJwtToken } =
    useUserStore();
  const { login } = useAirKitNew();

  const [requiredAge, setRequiredAge] = useState(18);
  
  useEffect(() => {
    // Only run when the user is logged in
    if (!isUserLoggedIn) return;
  
    console.log("🔁 Prefetching JWT token now that user is logged in...");
  
    const fetchToken = async () => {
      try {
        const response = await fetch(`/api/generate-jwt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requiredAge: 21,
            scope: "issue verify",
          }),
        });
  
        console.log("🔍 JWT endpoint status:", response.status);
  
        const { authToken } = await response.json();
  
        if (!authToken) throw new Error("Failed to get auth token from backend");
        setJwtToken(authToken);
        console.log("✅ JWT token generated on reload");
      } catch (err) {
        console.error("❌ Failed to generate JWT:", err);
      }
    };
  
    // optional: small delay so Privy wallet/session finishes initialization
    const timer = setTimeout(fetchToken, 500);
    return () => clearTimeout(timer);
  }, [isUserLoggedIn, setJwtToken]);



  useEffect(() => {
    console.log("🔍 Zustand store state:", {
      user,
      isUserLoggedIn,
      isUserVerified,
      userVerificationStatus,
    });
  }, [user, isUserLoggedIn, isUserVerified, userVerificationStatus]);

  const renderActionButton = () => {
    if (!isUserLoggedIn) {
      return (
        <button
          onClick={login}
          className="px-4 py-2 bg-white/90 hover:bg-white text-pink-600 rounded-md font-semibold shadow"
        >
          Log in to continue
        </button>
      );
    }

    switch (userVerificationStatus) {
      case "Unverified":
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white/90 px-4 py-2 rounded-md text-sm font-medium text-pink-600">
              👋 You’re logged in — not verified yet.
            </div>
            <VerifyButton />
            <p className="text-xs text-white/90">
              Complete quick age verification.
            </p>
          </div>
        );

      case "Revoked":
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white/90 px-4 py-2 rounded-md text-sm font-medium text-red-700">
              ⚠️ Verification revoked — reissue credential
            </div>
            <IssueCredentialButton />
            <p className="text-xs text-white/90">Reissue to regain access.</p>
          </div>
        );

      case "Compliant":
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="bg-white/90 px-4 py-2 rounded-md text-sm font-medium text-green-700">
              ✅ Verified — enjoy the cellar
            </div>
            <p className="text-xs text-white/90">Premium content unlocked.</p>
          </div>
        );

      default:
        return (
          !isUserVerified && (
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white/90 px-4 py-2 rounded-md text-sm font-medium text-yellow-800">
                ⚠️ Verification status unknown
              </div>
              <VerifyButton />
              <p className="text-xs text-white/90">
                Please verify to continue.
              </p>
            </div>
          )
        );
    }
  };

  // normalize booleans (handles undefined states too)
  const verified = Boolean(isUserVerified);
  const loggedIn = Boolean(isUserLoggedIn);

  // Show overlay when user is not verified OR not logged in (so they can login)
  const shouldShowWidget = !verified || !loggedIn;

  // Background should be considered "restricted" when widget is visible (blur + disable interaction)
  const isRestricted = shouldShowWidget;

  return (
    <main className="min-h-screen relative">
      {/* Background (Featured-Bottle gradient) */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 -z-10" />

      {/* Page content wrapper */}
      <div
        className={`relative transition-filter duration-300 ${
          isRestricted ? "filter blur-md pointer-events-none select-none" : ""
        }`}
        // hide content from screen readers when the overlay is shown
        aria-hidden={shouldShowWidget ? "true" : "false"}
      >
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-5xl font-extrabold leading-tight mb-4">
                Curated Reserve — Exclusive Wine Vault
              </h1>
              <p className="text-lg max-w-xl opacity-90 mb-6">
                Rare vintages, expert tasting notes, and members-only releases.
                Quick age verification opens the cellar — no social posts, just
                confirmation.
              </p>

              <div className="flex items-center gap-3">
                {verified ? (
                  <a
                    href="#explore"
                    className="inline-block px-6 py-3 rounded-md bg-white text-pink-600 font-semibold shadow"
                  >
                    Explore the cellar
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      if (!loggedIn) login();
                    }}
                    className="inline-block px-6 py-3 rounded-md bg-white/90 text-pink-600 font-semibold shadow"
                  >
                    {loggedIn ? "Verify Age" : "Log in to Verify"}
                  </button>
                )}

                <a
                  href="#events"
                  className="inline-block px-4 py-2 border border-white/30 rounded-md text-white/90 text-sm"
                >
                  Upcoming tastings
                </a>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-xl">
              {/* Hero image (public Unsplash) */}
              <img
                src="/large-house-wine.jpeg"
                alt="Beautiful wine bottle and glass"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </section>

        {/* EXPLORE SECTIONS (homepage style) */}
        <section id="explore" className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Gallery */}
            <div className="col-span-2 space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Featured Collections
              </h2>
              <p className="text-white/90 max-w-2xl">
                A rotating selection of cellar highlights and sommelier picks.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <img
                  src="/red-wine-closeup.jpg"
                  alt="Red wine closeup"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img
                  src="/whiskey-selection.jpeg"
                  alt="Wine cellar"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img
                  src="/coffee-selections.jpeg"
                  alt="Wine glasses"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="mt-6 bg-white/10 p-6 rounded-lg text-white/90">
                <h3 className="font-semibold text-lg mb-2">Sommelier Notes</h3>
                <p className="text-sm">
                  Explore tasting notes across acidity, tannin, body and finish.
                  Our sommelier team provides pairing suggestions for each
                  release.
                </p>
              </div>
            </div>

            {/* Regions & CTA */}
            <aside className="space-y-6">
              <div className="bg-white/6 p-6 rounded-lg text-white/90">
                <h4 className="font-semibold mb-2">Regions</h4>
                <ul className="text-sm space-y-2">
                  <li>Bordeaux — bold blends & cassis</li>
                  <li>Tuscany — rustic Sangiovese</li>
                  <li>Champagne — refined bubbles</li>
                </ul>
              </div>

              <div className="bg-white/6 p-6 rounded-lg text-white/90">
                <h4 className="font-semibold mb-2">Tasting Events</h4>
                <p className="text-sm mb-3">
                  Join exclusive virtual tastings — limited seats for members.
                </p>
                <a
                  id="events"
                  className="inline-block px-4 py-2 bg-white/90 text-pink-600 rounded-md font-medium"
                  href="#"
                >
                  Reserve seat
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* TASTING NOTES / MAP */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Tasting Notes Lab
              </h3>
              <p className="text-white/90 mt-2 max-w-xl">
                Rate acidity, tannin and finish to build a personal palate
                profile. Use the sample tool to discover wines you’ll love.
              </p>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/landscape-vineyard.jpeg"
                alt="Vineyard landscape"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>
        </section>

        {/* FOOTER (compact) */}
        <footer className="max-w-7xl mx-auto px-6 py-10 text-white/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <strong>Curated Reserve</strong>
              <div className="text-sm">
                © {new Date().getFullYear()} Curated Reserve
              </div>
            </div>

            <div className="text-sm">
              <a href="#" className="underline">
                Terms
              </a>{" "}
              ·{" "}
              <a href="#" className="underline">
                Privacy
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Overlay / widget area - show for NOT verified OR not logged in */}
      {shouldShowWidget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Subtle dim backdrop so background remains visible */}
          <div className="absolute inset-0 bg-black bg-opacity-30" />

          {/* Widget card */}
          {/* Improved widget — privacy-first, simple age verification */}
          <div
            className="relative z-10 w-full max-w-md mx-4"
            role="dialog"
            aria-labelledby="privyage-title"
            aria-modal="true"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 ring-1 ring-black/5">
              <header className="text-center mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50/80 text-pink-600 text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v2a4 4 0 108 0V6a4 4 0 00-4-4zM6 8V6a4 4 0 118 0v2a6 6 0 11-8 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  PrivyAge
                </div>

                <h3
                  id="privyage-title"
                  className="mt-3 text-lg font-semibold text-slate-800"
                >
                  Quick age verification
                </h3>

                <p className="mt-1 text-sm text-slate-500 max-w-[28rem] mx-auto">
                  Confirm you are{" "}
                  <strong className="text-slate-700">{requiredAge}+</strong>. No
                  personal identifiers are stored.
                </p>
              </header>

              <div className="flex flex-col items-center justify-center gap-4 py-2">
                {/* Action area (login / verify / issue) */}
                <div className="w-full text-center">{renderActionButton()}</div>

                <div className="w-full mt-1 border-t border-slate-100 pt-3 text-xs text-slate-500 text-center">
                  <p>
                    Privacy-first — only a single "age" attribute is checked and
                    attested.
                  </p>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Verifiable on-chain attestation — tamper-evident, minimal
                    data exposure.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-slate-50 text-[12px] text-slate-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path
                      d="M12 1v4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 19v4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.2 4.2l2.8 2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 17l2.8 2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-medium">Blockchain-backed</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">Minimal data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
