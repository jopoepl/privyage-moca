"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-16 pt-10">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500 mb-6 animate-pulse">
              PrivyAge on Moca Chain
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Privacy-first age verification powered by Moca Chain’s
              decentralized blockchain. Secure, anonymous, and Web3-native.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="/demo"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]"
              >
                🍷 Explore Demo
              </a>
              <a
                href="https://github.com/jopoepl/privyage-moca"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
              >
                📚 View Docs
              </a>
            </div>
          </header>

          {/* Features Section */}
          <section className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300">
              <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-300 text-lg">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Zero Data Storage
              </h3>
              <p className="text-gray-300 text-sm">
                No personal data is stored. Age verification is processed
                securely using Moca Chain’s decentralized trust.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300">
              <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-300 text-lg">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Instant Verification
              </h3>
              <p className="text-gray-300 text-sm">
                Cryptographically secure age checks powered by Moca Chain for
                fast, seamless access to restricted content.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300">
              <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-300 text-lg">🌐</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Web3 Native
              </h3>
              <p className="text-gray-300 text-sm">
                Built for dApps and Web3 platforms, with easy integration for
                traditional websites.
              </p>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mt-16 bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-[0_0_20px_rgba(147,51,234,0.2)]">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              How PrivyAge Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-4">
                <span className="bg-purple-900 text-purple-300 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-white">
                    Initiate Verification
                  </h4>
                  <p className="text-gray-300 text-sm">
                    User clicks "Verify Age" to start the process.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="bg-purple-900 text-purple-300 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-white">Secure Input</h4>
                  <p className="text-gray-300 text-sm">
                    User submits age via an encrypted form.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="bg-purple-900 text-purple-300 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold flex-shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-white">
                    Blockchain Verification
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Moca Chain validates the JWT, ensuring privacy and security.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="bg-purple-900 text-purple-300 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold flex-shrink-0">
                  4
                </span>
                <div>
                  <h4 className="font-semibold text-white">Token Issuance</h4>
                  <p className="text-gray-300 text-sm">
                    Backend generates a signed JWT for verification.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="bg-purple-900 text-purple-300 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold flex-shrink-0">
                  5
                </span>
                <div>
                  <h4 className="font-semibold text-white">Validation</h4>
                  <p className="text-gray-300 text-sm">
                    Token is verified via AirKit’s JWKS endpoint.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="bg-purple-900 text-purple-300 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold flex-shrink-0">
                  6
                </span>
                <div>
                  <h4 className="font-semibold text-white">Access Granted</h4>
                  <p className="text-gray-300 text-sm">
                    Content unlocks if age meets requirements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Secure Your dApp with PrivyAge
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the future of age verification with Moca Chain’s
              privacy-first, decentralized solution.
            </p>
            <a
              href="/demo"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]"
            >
              Get Started Now
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
