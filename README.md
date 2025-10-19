# 🛡️ PrivyAge — Blockchain-Powered Age Verification

A privacy-first, blockchain-powered age verification system built with Next.js 15+ and Node.js.
It verifies user age using cryptographically-signed JWTs, without storing any personal data.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone & Install

\`\`\`bash
git clone <repository-url>
cd privyage
npm install
\`\`\`

### 2. Run the App

\`\`\`bash
npm run dev
\`\`\`

Then visit:
👉 [http://localhost:3000/demo](http://localhost:3000/demo)

## 🏗️ Project Structure

\`\`\`
privyage/
├── app/
│ ├── api/
│ │ └── generate-jwt/route.ts # Generates signed JWTs
│ └── demo/page.tsx # Demo page (UI)
│
├── components/
│ ├── VerifyButton.tsx # Age verification trigger
│ └── IssueCredentialButton.tsx # Credential issuance trigger
│
├── hooks/
│ ├── useAirKitNew.ts
│ ├── useAirKitService.ts
│ ├── useAgeVerificationNew.ts
│ └── useCredentialIssuanceNew.ts
│
├── services/
│ └── airKitService.ts # AirKit API logic
│
├── store/
│ └── useUserStore.ts # Global user state (Zustand)
│
└── package.json
\`\`\`

## 🔐 How It Works

1. User initiates verification via the \`VerifyButton\`.
2. The app calls \`/api/generate-jwt\` to get a signed JWT (RSA).
3. The token is verified via AirKit’s JWKS endpoint.
4. If the user’s age ≥ required minimum → verification success.
5. Optionally, user can issue a credential on-chain via \`IssueCredentialButton\`.

## ⚙️ Configuration

Create a \`.env.local\` file:
\`\`\`
NEXT_PUBLIC_REQUIRED_AGE=18
NEXT_PUBLIC_API_URL=/api/generate-jwt
\`\`\`
Add any AirKit or external service keys if required.

## 🧪 Demo

The demo page shows a complete verification and credential flow:

- \`/demo\`
- Blur-until-verified UI
- Privacy-focused flow (no personal data stored)
- Blockchain-backed verification

## 🛠️ Scripts

\`\`\`bash
npm run dev # Start local server
npm run build # Build for production
npm run start # Start production build
npm run lint # Run ESLint
\`\`\`

## 🔒 Features

✅ **JWT-based Verification** — Secure and cryptographically signed
🧠 **Blockchain Integration** — Uses AirKit for on-chain credentialing
🚫 **No Data Storage** — Fully privacy-first
⚡ **Next.js App Router** — Modern serverless-ready architecture

## 📄 License

MIT License — see [LICENSE](#) for details.

## 🤝 Contributing

1. Fork this repo
2. Create a new branch
3. Make your changes
4. Submit a PR
