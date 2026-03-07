"use client";

import { useState, useEffect, useRef } from "react";

// ============================================================
// TYPES
// ============================================================

interface ChatMessage {
  id: string;
  sender: "visitor" | "bot";
  text: string;
  time: string;
}

interface QuickReply {
  label: string;
  response: string;
  followUp?: string;
}

// ============================================================
// CONFIGURATION — Customize these for your business
// ============================================================

const CHAT_CONFIG = {
  companyName: "papatiger.tech",
  welcomeMessage: "Hi there! 👋 How can we help you today?",
  awayMessage: "We usually reply within a few hours. Leave your email and we'll get back to you!",
  emailEndpoint: "/api/chat-email", // Next.js API route
  accentColor: "#4f6ef7",
  gradientEnd: "#c44de8",
};

const QUICK_REPLIES: QuickReply[] = [
  {
    label: "💰 Pricing info",
    response: "Our pricing depends on the project scope. Roughly: small fixes $300–$1K, medium web apps $2K–$10K, complex platforms $10K+. Want a more specific estimate?",
    followUp: "You can try our free Project Estimator on the site, or tell me a bit about your project and I'll give you a ballpark.",
  },
  {
    label: "⏱️ How long does a project take?",
    response: "Typical timelines: small projects 1–2 weeks, medium apps 4–8 weeks, complex platforms 10–16 weeks. We provide exact timelines during our free discovery call.",
  },
  {
    label: "🛠️ What tech do you use?",
    response: "We build with Next.js, React, Node.js, PostgreSQL, and deploy on AWS. We pick the right stack for each project — not just what's trendy.",
  },
  {
    label: "📋 Do you sign NDAs?",
    response: "Yes, absolutely. We take confidentiality seriously and sign NDAs before discussing project details. Just ask!",
  },
  {
    label: "🚀 I have a project idea",
    response: "That's great! Tell me briefly: what problem does it solve and who is it for? I'll let you know if we're a good fit and what the next steps would be.",
  },
  {
    label: "💬 Talk to a human",
    response: "Of course! Leave your email and a brief description of what you need, and we'll personally reply within 24 hours. Or email us directly at hello@papatiger.tech",
  },
];

// ============================================================
// HELPERS
// ============================================================

function getTimeString(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function LiveChat(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingIndicator]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          { id: generateId(), sender: "bot", text: CHAT_CONFIG.welcomeMessage, time: getTimeString() },
        ]);
      }, 300);
    }
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, delay: number = 800) => {
    setTypingIndicator(true);
    setTimeout(() => {
      setTypingIndicator(false);
      setMessages((prev) => [...prev, { id: generateId(), sender: "bot", text, time: getTimeString() }]);
    }, delay);
  };

  const handleQuickReply = (qr: QuickReply) => {
    // Add visitor's question
    setMessages((prev) => [
      ...prev,
      { id: generateId(), sender: "visitor", text: qr.label.replace(/^[^\s]+\s/, ""), time: getTimeString() },
    ]);
    setShowQuickReplies(false);

    // Bot response
    addBotMessage(qr.response, 1000);

    // Follow-up if exists
    if (qr.followUp) {
      addBotMessage(qr.followUp, 2500);
    }

    // Show quick replies again after a delay
    setTimeout(() => setShowQuickReplies(true), qr.followUp ? 3500 : 2000);
  };

  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: generateId(), sender: "visitor", text, time: getTimeString() },
    ]);
    setInputValue("");
    setShowQuickReplies(false);

    // Smart auto-response based on keywords
    const lower = text.toLowerCase();
    let response: string;

    if (lower.includes("price") || lower.includes("cost") || lower.includes("budget") || lower.includes("how much")) {
      response = "Our pricing varies by project scope — typically $2K–$10K for most web apps. Try our free Project Estimator on the site for an instant ballpark, or leave your email and I'll send a personalized estimate.";
    } else if (lower.includes("time") || lower.includes("long") || lower.includes("deadline") || lower.includes("when")) {
      response = "Most projects take 4–8 weeks. Rush delivery (under 4 weeks) is possible with a tighter scope. Want to tell me more about your timeline?";
    } else if (lower.includes("email") || lower.includes("contact") || lower.includes("reach")) {
      response = "You can reach us at hello@papatiger.tech or WhatsApp +8801-721-821456. We reply within 24 hours!";
    } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
      response = "Hey! 👋 Good to have you here. What can I help you with? Feel free to ask anything about our services.";
    } else {
      response = "Thanks for your message! To give you the best answer, I'd love to connect you with our team. Would you like to leave your email so we can follow up personally?";
      setTimeout(() => setShowEmailCapture(true), 2000);
    }

    addBotMessage(response, 1200);
    setTimeout(() => setShowQuickReplies(true), 2500);
  };

  const handleEndChat = async () => {
    if (messages.length <= 1) {
      setIsOpen(false);
      return;
    }
    setShowEmailCapture(true);
  };

  const handleSendTranscript = async () => {
    if (!visitorEmail.includes("@")) return;

    setIsSending(true);

    const transcript = messages
      .map((m) => `[${m.time}] ${m.sender === "visitor" ? "Visitor" : "Bot"}: ${m.text}`)
      .join("\n");

    try {
      const res = await fetch(CHAT_CONFIG.emailEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorName: visitorName || "Anonymous",
          visitorEmail,
          transcript,
          messageCount: messages.filter((m) => m.sender === "visitor").length,
          timestamp: new Date().toISOString(),
          page: typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });

      if (res.ok) {
        setEmailSent(true);
        addBotMessage("Got it! We'll review your conversation and reply to " + visitorEmail + " within 24 hours. Thanks for chatting! 🙌", 500);
      } else {
        addBotMessage("Hmm, something went wrong. Please email us directly at hello@papatiger.tech and we'll help you out!", 500);
      }
    } catch {
      addBotMessage("Couldn't send right now. Please email us at hello@papatiger.tech — we'd love to help!", 500);
    }

    setIsSending(false);
    setShowEmailCapture(false);
  };

  const GRADIENT = `linear-gradient(135deg, ${CHAT_CONFIG.accentColor}, ${CHAT_CONFIG.gradientEnd})`;

  // ---- CHAT BUBBLE (closed state) ----
  if (!isOpen) {
    return (
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
        {/* Notification dot */}
        {hasNewMessage && (
          <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: "#ef4444", border: "3px solid #0a0e1a", zIndex: 2 }} />
        )}
        <button
          onClick={() => { setIsOpen(true); setHasNewMessage(false); }}
          aria-label="Open chat"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: GRADIENT,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 6px 28px ${CHAT_CONFIG.accentColor}50`,
            transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = `0 8px 36px ${CHAT_CONFIG.accentColor}60`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 6px 28px ${CHAT_CONFIG.accentColor}50`; }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </button>
      </div>
    );
  }

  // ---- CHAT WINDOW (open state) ----
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 380,
        maxWidth: "calc(100vw - 32px)",
        height: 540,
        maxHeight: "calc(100vh - 48px)",
        borderRadius: 20,
        overflow: "hidden",
        background: "#0d1117",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(79,110,247,0.08)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column" as const,
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        animation: "chatSlideUp 0.35s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>

      {/* ---- HEADER ---- */}
      <div
        style={{
          padding: "16px 20px",
          background: GRADIENT,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Avatar */}
          <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff" }}>
            🐯
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{CHAT_CONFIG.companyName}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
              We typically reply within a few hours
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {/* End chat / send transcript */}
          {messages.length > 1 && !emailSent && (
            <button
              onClick={handleEndChat}
              title="End chat & email transcript"
              style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </button>
          )}
          {/* Close */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ---- MESSAGES ---- */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 8px",
          display: "flex",
          flexDirection: "column" as const,
          gap: 12,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.sender === "visitor" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "82%",
                padding: "12px 16px",
                borderRadius: msg.sender === "visitor" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.sender === "visitor" ? CHAT_CONFIG.accentColor : "rgba(255,255,255,0.06)",
                border: msg.sender === "visitor" ? "none" : "1px solid rgba(255,255,255,0.08)",
                color: msg.sender === "visitor" ? "#fff" : "#e2e8f0",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {msg.text}
              <div style={{ fontSize: 10, color: msg.sender === "visitor" ? "rgba(255,255,255,0.5)" : "#4b5563", marginTop: 4, textAlign: "right" as const }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typingIndicator && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "12px 18px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#94a3b8", animation: `typingDot 1.2s infinite ${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Quick Replies */}
        {showQuickReplies && !showEmailCapture && !emailSent && messages.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginTop: 4 }}>
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr.label}
                onClick={() => handleQuickReply(qr)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: `1px solid ${CHAT_CONFIG.accentColor}30`,
                  background: `${CHAT_CONFIG.accentColor}0A`,
                  color: CHAT_CONFIG.accentColor,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap" as const,
                }}
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}

        {/* Email Capture Form */}
        {showEmailCapture && !emailSent && (
          <div style={{ padding: "16px", background: "rgba(79,110,247,0.06)", border: `1px solid ${CHAT_CONFIG.accentColor}20`, borderRadius: 14, marginTop: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>Get a personal reply</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>We'll email you the full conversation + our response within 24h.</div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9", fontSize: 13, fontFamily: "inherit", outline: "none" }}
              />
              <input
                type="email"
                placeholder="your@email.com *"
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendTranscript()}
                style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9", fontSize: 13, fontFamily: "inherit", outline: "none" }}
              />
              <button
                onClick={handleSendTranscript}
                disabled={isSending}
                style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: GRADIENT, color: "#fff", fontSize: 13, fontWeight: 700, cursor: isSending ? "wait" : "pointer", fontFamily: "inherit", opacity: isSending ? 0.7 : 1 }}
              >
                {isSending ? "Sending..." : "Send Transcript to My Email →"}
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ---- INPUT ---- */}
      {!emailSent && (
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "#f1f5f9",
              fontSize: 14,
              fontFamily: "inherit",
              outline: "none",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = `${CHAT_CONFIG.accentColor}40`; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            aria-label="Send message"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "none",
              background: inputValue.trim() ? GRADIENT : "rgba(255,255,255,0.06)",
              cursor: inputValue.trim() ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={inputValue.trim() ? "#fff" : "#4b5563"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      )}

      {/* Powered by */}
      <div style={{ padding: "6px 0", textAlign: "center" as const, flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: "#333" }}>Powered by papatiger.tech</span>
      </div>
    </div>
  );
}
