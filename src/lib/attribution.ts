/**
 * First-touch acquisition attribution, captured on landing and reused for the
 * inquiry alert email and Calendly link tagging. Privacy rules:
 * - Only allowlisted UTM keys with safe token characters are kept.
 * - Landing path is a bare pathname — never a full URL, query string, or referrer.
 * - Storage access is wrapped in try/catch for browsers that block it.
 */

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  landingPath?: string;
};

const STORAGE_KEY = "ab_attr_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

/** Safe token: letters, digits, dash, underscore; 1–100 chars. */
const TOKEN_RE = /^[A-Za-z0-9_-]{1,100}$/;
/** Bare pathname: starts with /, no query string, no protocol-relative tricks. */
const PATH_RE = /^\/(?!\/)[A-Za-z0-9\-._~/]{0,199}$/;

/** Keep only valid values from an arbitrary input object. */
export function sanitizeAttribution(input: unknown): Attribution {
  const out: Attribution = {};
  if (!input || typeof input !== "object") return out;
  const rec = input as Record<string, unknown>;
  for (const k of UTM_KEYS) {
    const v = rec[k];
    if (typeof v === "string" && TOKEN_RE.test(v)) out[k] = v;
  }
  const p = rec["landingPath"];
  if (typeof p === "string" && PATH_RE.test(p)) out.landingPath = p;
  return out;
}

/** Capture first-touch attribution from the current landing URL. Call once on app start. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return; // first touch wins
    const params = new URLSearchParams(window.location.search);
    const raw: Record<string, string> = { landingPath: window.location.pathname };
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) raw[k] = v;
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeAttribution(raw)));
  } catch {
    // Storage blocked (private mode, disabled cookies) — attribution is optional, skip silently.
  }
}

/** Read the captured attribution, re-sanitized. Empty object when unavailable. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return sanitizeAttribution(JSON.parse(raw));
  } catch {
    return {};
  }
}

/** Safe UTM params suitable for forwarding to an outbound link (e.g. Calendly). */
export function attributionUtmParams(): Record<string, string> {
  const a = getAttribution();
  const out: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    if (a[k]) out[k] = a[k]!;
  }
  return out;
}
