# PrivyAge Moca - Frontend

A privacy-first age verification service built with Next.js 15+ and TypeScript.

## Features

- 🔐 **Privacy-First**: No personal data storage
- 🛡️ **Cryptographically Secure**: JWT-based verification
- 🎨 **Modern UI**: Built with Tailwind CSS
- 📱 **Responsive**: Works on all devices
- 🔌 **Easy Integration**: Simple widget for external sites
- ⚡ **Fast**: Built with Next.js 15+ and App Router

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page
│   │   └── layout.tsx        # Root layout
│   └── components/
│       └── AgeVerificationWidget.tsx
├── public/
│   ├── widget.js             # External widget script
│   └── popup.html            # Standalone popup
├── next.config.js            # Next.js configuration
└── package.json
```

## Widget Integration

### Method 1: Script Tag

Include the widget script in your HTML:

```html
<script src="http://localhost:3000/widget.js"></script>
<script>
  const widget = new PrivyAgeWidget({
    apiUrl: "http://localhost:3001/api/verify-age",
    requiredAge: 18,
    onVerified: (verified, age) => {
      console.log("Age verified:", age);
      // Handle verified user
    },
    onError: (error) => {
      console.error("Verification failed:", error);
    },
  });

  // Show the widget
  widget.show();
</script>
```

### Method 2: Data Attributes

Add data attributes to any element:

```html
<div
  data-privyage-widget
  data-api-url="http://localhost:3001/api/verify-age"
  data-required-age="18"
  data-on-verified="handleVerified"
  data-on-error="handleError"
>
  Verify Age
</div>
```

### Method 3: Popup Window

Open the popup in a new window:

```javascript
const popup = window.open(
  "http://localhost:3000/popup.html?requiredAge=18&apiUrl=http://localhost:3001/api/verify-age",
  "ageVerification",
  "width=400,height=500,scrollbars=no,resizable=no",
);

window.addEventListener("message", (event) => {
  if (event.data.type === "PRIVYAGE_VERIFICATION_RESULT") {
    popup.close();
  }
});
```

## API Endpoints

The frontend proxies requests to the backend API:

- `POST /api/verify-age/verify` - Verify age with JWT token
- `POST /api/verify-age/generate-test-token` - Generate test token (dev only)
- `GET /api/verify-age/.well-known/jwks.json` - Get JWKS for token verification

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/verify-age
NEXT_PUBLIC_REQUIRED_AGE=18
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint with Next.js config

## Security Considerations

- All age verification happens server-side
- JWT tokens are cryptographically signed
- No personal data is stored in the frontend
- CORS is properly configured
- Input validation on both client and server

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
