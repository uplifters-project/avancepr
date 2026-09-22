import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// POST /api/admin/login  body: { email, password }  -> { ok: true } | 401/429
//
// Proxies Supabase Auth password sign-in through our own server instead of
// calling it directly from the browser (as the login page used to), purely
// so this route can sit in front of it with an app-level attempt cap —
// Supabase's own per-IP GoTrue rate limit still applies underneath this,
// this is an additional, coarser layer against a single IP hammering one
// admin account. createSupabaseServerClient writes the resulting session
// cookies onto `res` exactly as it does for every other admin auth path.
//
// The counter is in-memory (a plain Map in this module), not backed by a
// database: it resets on every cold start/new function instance, and each
// concurrently-running serverless instance keeps its own count. That's a
// known, accepted tradeoff for a low-traffic single-admin panel — it isn't
// a substitute for Supabase's own rate limiting, only a cheap extra layer.
// It's also swept back to empty once a day so a legitimate admin who gets
// counted against isn't locked out indefinitely.

const MAX_ATTEMPTS_PER_DAY = 20;

const attempts = new Map<string, number>();
let lastResetDay = currentDay();

function currentDay(): string {
  return new Date().toISOString().slice(0, 10);
}

function resetIfNewDay() {
  const today = currentDay();
  if (today !== lastResetDay) {
    attempts.clear();
    lastResetDay = today;
  }
}

function clientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return first?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
}

const bodySchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ detail: `Method "${req.method}" not allowed.` });
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ detail: "Enter a valid email and password." });
  }

  resetIfNewDay();

  const ip = clientIp(req);
  const count = attempts.get(ip) ?? 0;
  if (count >= MAX_ATTEMPTS_PER_DAY) {
    return res.status(429).json({
      detail: "Too many sign-in attempts from this network today. Try again tomorrow.",
    });
  }
  attempts.set(ip, count + 1);

  const supabase = createSupabaseServerClient(req, res);
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return res.status(401).json({ detail: error.message });
  }

  return res.status(200).json({ ok: true });
}
