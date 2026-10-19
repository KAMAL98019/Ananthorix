// First-touch attribution for the session: the page a visitor landed on, the external site that sent them, and
// any UTM tags on that first URL. Captured once per tab session (sessionStorage) and read by the Start a Project
// form, so a visitor who lands on a service page from Google and then opens the form is still attributed to
// Google and that landing page. Values are visitor-controlled: the server sanitizes them and they are used for
// reporting only, never for security decisions.

export type Attribution = {
  landingPage: string;
  referrer: string;
  utm: Record<string, string>;
};

const KEY = "anx-first-touch";
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;

export function utmFrom(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value.slice(0, 100);
  }
  return utm;
}

// Referrers from this site are navigation, not a traffic source.
export function externalReferrer(referrer: string, ownHost: string): string {
  if (!referrer) return "";
  try {
    return new URL(referrer).host === ownHost ? "" : referrer.slice(0, 300);
  } catch {
    return "";
  }
}

function read(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

// Called on every page load. Keeps the first touch; a later visit with new UTM tags (a new campaign click) in
// the same session replaces it, because that is the most recent marketing source.
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const utm = utmFrom(window.location.search);
  const existing = read();
  if (existing && Object.keys(utm).length === 0) return;
  const current: Attribution = {
    landingPage: `${window.location.pathname}${window.location.search}`.slice(0, 200),
    referrer: externalReferrer(document.referrer, window.location.host),
    utm,
  };
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    // Storage blocked (private mode, settings): the form falls back to the current page.
  }
}

// Attribution for a submission: the stored first touch, or the current page if nothing was stored.
export function getAttribution(): Attribution {
  const stored = read();
  if (stored) return stored;
  return {
    landingPage: `${window.location.pathname}${window.location.search}`.slice(0, 200),
    referrer: externalReferrer(document.referrer, window.location.host),
    utm: utmFrom(window.location.search),
  };
}
