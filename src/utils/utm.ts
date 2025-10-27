// UTM tracking utility for Next.js
interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  landing_url?: string;
  landing_at?: string;
  referrer?: string;
  [key: string]: string | undefined;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

// --- cookies (fallback) ---
function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof window === 'undefined') return;
  
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

// --- session helpers ---
function saveToSession(obj: UTMData): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem("utm_payload", JSON.stringify(obj));
  } catch (_) {
    // Silently fail if sessionStorage is not available
  }
}

function readFromSession(): UTMData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const raw = sessionStorage.getItem("utm_payload");
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// --- main APIs you'll use ---
export function captureUTMFromURL(locationSearch?: string): UTMData {
  if (typeof window === 'undefined') return {};
  
  const search = locationSearch || window.location.search;
  const params = new URLSearchParams(search);
  const utm: UTMData = {};
  let found = false;

  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v && String(v).trim() !== "") {
      utm[k] = v.trim();
      found = true;
    }
  });

  // Add a couple of useful attribution extras (optional)
  const gclid = params.get("gclid");
  const fbclid = params.get("fbclid");
  if (gclid) utm.gclid = gclid;
  if (fbclid) utm.fbclid = fbclid;

  if (!found && !gclid && !fbclid) {
    // If URL has no UTM, don't overwrite existing captured values
    return getUTM(); // no-op, but returns existing if present
  }

  // stamp landing info
  utm.landing_url = window.location.href;
  utm.landing_at = new Date().toISOString();
  utm.referrer = document.referrer || "";

  // persist
  saveToSession(utm);
  setCookie("utm_payload", JSON.stringify(utm), 7);
  return utm;
}

export function getUTM(): UTMData {
  if (typeof window === 'undefined') return {};
  
  // 1) sessionStorage
  const s = readFromSession();
  if (s) return s;

  // 2) cookie
  const c = getCookie("utm_payload");
  if (c) {
    try {
      const parsed: UTMData = JSON.parse(c);
      // refresh session for faster access
      saveToSession(parsed);
      return parsed;
    } catch (_) {
      return {};
    }
  }
  return {};
}

// Use this just before sending to backend, to avoid sending empty keys
export function getUTMForSubmit(): UTMData {
  const data = getUTM() || {};
  const cleaned: UTMData = {};
  
  Object.keys(data).forEach((k) => {
    const v = data[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      cleaned[k] = String(v).trim();
    }
  });
  
  return cleaned;
}

// If you ever need to clear after purchase:
export function clearUTM(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem("utm_payload");
  } catch (_) {
    // Silently fail
  }
  setCookie("utm_payload", "", -1);
}
