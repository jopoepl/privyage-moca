// app/api/generate-jwt/route.ts
export const runtime = "nodejs";

import fs from "fs";
import path from "path";
import * as jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

type JwtOpts = {
  subject?: string;
  audience?: string;
  issuer?: string;
  expiresInSec?: number;
  claims?: Record<string, unknown>;
  scope?: string;
  kid?: string;
};

function generateJwt(
  partnerId: string,
  privateKey: string,
  opts: JwtOpts = {},
) {
  const issuer = opts.issuer || process.env.JWT_ISSUER || partnerId;
  const audience =
    opts.audience || process.env.JWT_AUDIENCE || "demo-site-client";
  const subject = opts.subject || partnerId;
  const expiresInSec = opts.expiresInSec ?? 5 * 60;
  const kid = opts.kid || process.env.JWT_KID || "default-kid";

  const payload: Record<string, unknown> = {
    ...(opts.claims ? { claims: opts.claims } : {}),
    ...(opts.scope ? { scope: opts.scope } : {}),
    partnerId,
  };

  const header = { alg: "RS256", kid, typ: "JWT" };

  const signOptions: jwt.SignOptions = {
    algorithm: "RS256",
    header,
    issuer,
    audience,
    subject,
    expiresIn: expiresInSec,
  };

  return jwt.sign(
    payload as object,
    privateKey as jwt.Secret,
    signOptions,
  ) as string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { subject, requiredAge = 18, scope } = body ?? {};

    // 1) Load raw PRIVATE_KEY if present (preferred)
    let privateKey = process.env.PRIVATE_KEY;

    // 2) If not present, decode PRIVATE_KEY_B64 (base64-encoded PEM)
    if (!privateKey && process.env.PRIVATE_KEY_B64) {
      try {
        privateKey = Buffer.from(
          process.env.PRIVATE_KEY_B64,
          "base64",
        ).toString("utf8");
      } catch (e) {
        console.error("Failed to decode PRIVATE_KEY_B64:", e);
      }
    }

    // 3) Local dev fallback to file
    if (!privateKey) {
      const privateKeyPath = path.resolve(process.cwd(), "privateDemo.pem");
      if (fs.existsSync(privateKeyPath)) {
        privateKey = fs.readFileSync(privateKeyPath, "utf8");
      }
    }

    // Debugging logs (remove in production)

    console.log(
      "Loaded privateKey length:",
      privateKey ? privateKey.length : "none",
    );
    if (privateKey)
      console.log(
        "privateKey startsWith:",
        privateKey.slice(0, 30).replace(/\n/g, "\\n"),
      );

    if (!privateKey) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Private key not found or invalid.",
        }),
        { status: 500 },
      );
    }

    if (!privateKey.includes("BEGIN")) {
      console.error(
        "⚠️ Private key doesn't look like a PEM. Check encoding/format.",
      );
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Private key format invalid.",
        }),
        { status: 500 },
      );
    }

    const partnerId =
      process.env.MOCA_PARTNER_ID || process.env.NEXT_PUBLIC_MOCA_PARTNER_ID;
    if (!partnerId) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "MOCA_PARTNER_ID not configured",
        }),
        { status: 500 },
      );
    }

    const opts: JwtOpts = {
      subject: subject || partnerId,
      audience: process.env.JWT_AUDIENCE || "demo-site-client",
      issuer: process.env.JWT_ISSUER || partnerId,
      expiresInSec: 5 * 60,
      claims: { ageVerified: requiredAge },
      scope: scope || "issue verify",
      kid: process.env.JWT_KID || "6386cb4d-c0de-4629-a412-8dcf6f50f805",
    };

    const token = generateJwt(partnerId, privateKey, opts);

    return new Response(
      JSON.stringify({
        status: "success",
        authToken: token,
        expiresIn: opts.expiresInSec,
        config: {
          verifierDid: process.env.MOCA_VERIFIER_DID,
          programId: process.env.MOCA_VERIFICATION_PROGRAM_ID,
          redirectUrlForIssuer: process.env.FRONTEND_URL
            ? `${process.env.FRONTEND_URL}/issue`
            : "http://localhost:3000/issue",
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("generate-jwt error:", err);
    return new Response(
      JSON.stringify({ status: "error", message: "Failed to generate JWT" }),
      { status: 500 },
    );
  }
}
