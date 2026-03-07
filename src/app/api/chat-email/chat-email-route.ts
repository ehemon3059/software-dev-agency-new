// ============================================================
// FILE: app/api/chat-email/route.ts
//
// This API route receives chat transcripts and sends them
// to your email. No database needed — email is the storage.
//
// SETUP (5 minutes):
// 1. Sign up at https://resend.com (free: 3000 emails/month)
// 2. Get your API key from the dashboard
// 3. Add to your .env.local:
//    RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//    CHAT_NOTIFY_EMAIL=hello@papatiger.tech
//
// 4. Install Resend: npm install resend
//
// ALTERNATIVE (no library needed):
// If you don't want to install Resend, see the fetch-based
// version at the bottom of this file.
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// Option A: Using Resend library (recommended)
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = process.env.CHAT_NOTIFY_EMAIL || "no.one3059@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

interface ChatEmailBody {
  visitorName: string;
  visitorEmail: string;
  transcript: string;
  messageCount: number;
  timestamp: string;
  page: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatEmailBody = await request.json();
    const { visitorName, visitorEmail, transcript, messageCount, timestamp, page } = body;

    // Validate
    if (!visitorEmail || !visitorEmail.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ error: "Transcript is empty" }, { status: 400 });
    }

    // Format timestamp
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    // Build email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #4f6ef7, #c44de8); color: #fff; padding: 24px 28px; }
    .header h1 { margin: 0 0 4px; font-size: 20px; font-weight: 700; }
    .header p { margin: 0; font-size: 13px; opacity: 0.85; }
    .body { padding: 28px; }
    .meta { background: #f8f9fa; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; }
    .meta-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 14px; }
    .meta-label { color: #666; }
    .meta-value { color: #111; font-weight: 600; }
    .transcript { background: #0d1117; border-radius: 8px; padding: 20px; color: #e2e8f0; font-family: monospace; font-size: 13px; line-height: 1.8; white-space: pre-wrap; }
    .visitor-msg { color: #60a5fa; }
    .bot-msg { color: #94a3b8; }
    .cta { text-align: center; padding: 24px; border-top: 1px solid #eee; }
    .cta a { display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #4f6ef7, #c44de8); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; }
    .footer { text-align: center; padding: 16px; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💬 New Chat Lead</h1>
      <p>${formattedDate}</p>
    </div>

    <div class="body">
      <div class="meta">
        <div class="meta-row">
          <span class="meta-label">Visitor Name</span>
          <span class="meta-value">${visitorName || "Anonymous"}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Visitor Email</span>
          <span class="meta-value"><a href="mailto:${visitorEmail}">${visitorEmail}</a></span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Messages</span>
          <span class="meta-value">${messageCount} visitor messages</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Page</span>
          <span class="meta-value">${page}</span>
        </div>
      </div>

      <h3 style="margin: 0 0 12px; font-size: 16px; color: #333;">Chat Transcript</h3>
      <div class="transcript">${transcript
        .split("\n")
        .map((line) => {
          if (line.includes("Visitor:")) {
            return `<span class="visitor-msg">${line}</span>`;
          }
          return `<span class="bot-msg">${line}</span>`;
        })
        .join("\n")}</div>
    </div>

    <div class="cta">
      <p style="color: #666; font-size: 14px; margin: 0 0 12px;">Reply to this visitor:</p>
      <a href="mailto:${visitorEmail}?subject=Re: Your inquiry on papatiger.tech&body=Hi ${visitorName || "there"},%0A%0AThanks for reaching out via our chat!%0A%0A">
        Reply to ${visitorName || visitorEmail} →
      </a>
    </div>

    <div class="footer">
      papatiger.tech Chat System — No data stored, transcript delivered via email only.
    </div>
  </div>
</body>
</html>`;

    // ============================================================
    // SEND EMAIL VIA RESEND (fetch-based, no library needed)
    // ============================================================

    if (!RESEND_API_KEY) {
      console.error("[Chat Email] RESEND_API_KEY is not set. Add it to .env.local");
      // In development, just log the transcript
      console.log("=== CHAT TRANSCRIPT (email not sent — no API key) ===");
      console.log(`From: ${visitorName} (${visitorEmail})`);
      console.log(transcript);
      console.log("====================================================");
      return NextResponse.json({ success: true, dev: true });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "papatiger.tech Chat <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        reply_to: visitorEmail,
        subject: `💬 Chat Lead: ${visitorName || visitorEmail} — ${messageCount} messages`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("[Chat Email] Resend error:", errorData);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Chat Email] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ============================================================
// ALTERNATIVE: Using Nodemailer (if you prefer Gmail SMTP)
//
// 1. npm install nodemailer
// 2. Add to .env.local:
//    GMAIL_USER=your@gmail.com
//    GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
//    (Create app password at: https://myaccount.google.com/apppasswords)
//
// Replace the Resend fetch call above with:
//
// import nodemailer from "nodemailer";
//
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });
//
// await transporter.sendMail({
//   from: process.env.GMAIL_USER,
//   to: NOTIFY_EMAIL,
//   replyTo: visitorEmail,
//   subject: `💬 Chat Lead: ${visitorName || visitorEmail}`,
//   html: emailHtml,
// });
// ============================================================