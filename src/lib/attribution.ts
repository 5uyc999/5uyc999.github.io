/**
 * First/last-touch marketing attribution for the public website.
 *
 * Goals:
 * - Preserve the original source that first brought the visitor.
 * - Preserve the latest non-direct acquisition source.
 * - Keep Google Ads click IDs (gclid/gbraid/wbraid) with form leads.
 * - Avoid collecting sensitive personal data here.
 */

export type AttributionTouch = {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  landingPage: string;
  referrer: string;
  capturedAt: string;
};

export type AttributionSnapshot = {
  sessionId: string;
  referenceCode: string;
  firstTouch: AttributionTouch;
  lastTouch: AttributionTouch;
};

const FIRST_TOUCH_KEY = "lams_attribution_first";
const LAST_TOUCH_KEY = "lams_attribution_last";
const SESSION_ID_KEY = "lams_session_id";
const REFERENCE_KEY = "lams_reference_code";
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

const emptyTouch = (): AttributionTouch => ({
  source: "direct",
  medium: "(none)",
  campaign: "",
  term: "",
  content: "",
  gclid: "",
  gbraid: "",
  wbraid: "",
  landingPage: "",
  referrer: "",
  capturedAt: new Date().toISOString(),
});

function safeStorage(kind: "local" | "session") {
  if (typeof window === "undefined") return null;
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function truncate(value: string | null | undefined, max = 500) {
  return (value || "").trim().slice(0, max);
}

function readStoredTouch(key: string): AttributionTouch | null {
  const storage = safeStorage("local");
  if (!storage) return null;

  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttributionTouch;
    const captured = Date.parse(parsed.capturedAt || "");
    if (!Number.isFinite(captured) || Date.now() - captured > ATTRIBUTION_TTL_MS) {
      storage.removeItem(key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredTouch(key: string, touch: AttributionTouch) {
  const storage = safeStorage("local");
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(touch));
  } catch {
    // Attribution must never block the customer journey.
  }
}

function getReferrerSource(referrer: string): { source: string; medium: string } | null {
  if (!referrer || typeof window === "undefined") return null;

  try {
    const url = new URL(referrer);
    if (url.hostname === window.location.hostname) return null;

    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (host === "google.com" || host.startsWith("google.") || host.includes(".google.")) {
      return { source: "google", medium: "organic" };
    }
    if (host === "bing.com" || host.endsWith(".bing.com")) {
      return { source: "bing", medium: "organic" };
    }
    if (host === "yahoo.com" || host.endsWith(".yahoo.com")) {
      return { source: "yahoo", medium: "organic" };
    }
    return { source: host, medium: "referral" };
  } catch {
    return null;
  }
}

function buildTouch(): { touch: AttributionTouch; meaningful: boolean } {
  if (typeof window === "undefined") return { touch: emptyTouch(), meaningful: false };

  const params = new URLSearchParams(window.location.search);
  const utmSource = truncate(params.get("utm_source"), 120);
  const utmMedium = truncate(params.get("utm_medium"), 120);
  const gclid = truncate(params.get("gclid"), 255);
  const gbraid = truncate(params.get("gbraid"), 255);
  const wbraid = truncate(params.get("wbraid"), 255);
  const referrer = truncate(document.referrer, 1000);
  const referrerSource = getReferrerSource(referrer);

  let source = utmSource;
  let medium = utmMedium;

  if (!source && (gclid || gbraid || wbraid)) {
    source = "google";
    medium = medium || "cpc";
  }

  if (!source && referrerSource) {
    source = referrerSource.source;
    medium = referrerSource.medium;
  }

  const meaningful = Boolean(
    utmSource || utmMedium || params.get("utm_campaign") || params.get("utm_term") ||
    params.get("utm_content") || gclid || gbraid || wbraid || referrerSource
  );

  return {
    meaningful,
    touch: {
      source: source || "direct",
      medium: medium || "(none)",
      campaign: truncate(params.get("utm_campaign"), 255),
      term: truncate(params.get("utm_term"), 255),
      content: truncate(params.get("utm_content"), 255),
      gclid,
      gbraid,
      wbraid,
      landingPage: truncate(`${window.location.pathname}${window.location.search}`, 1000),
      referrer,
      capturedAt: new Date().toISOString(),
    },
  };
}

export function getSessionId() {
  const storage = safeStorage("session");
  if (!storage) return "";

  try {
    let id = storage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sess-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      storage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

export function getLeadReference() {
  const storage = safeStorage("session");
  if (!storage) return "";

  try {
    let code = storage.getItem(REFERENCE_KEY);
    if (!code) {
      const seed = getSessionId().replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase();
      code = `LMS-${seed || Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      storage.setItem(REFERENCE_KEY, code);
    }
    return code;
  } catch {
    return "";
  }
}

export function captureAttribution(): AttributionSnapshot {
  const { touch, meaningful } = buildTouch();
  const first = readStoredTouch(FIRST_TOUCH_KEY);
  const last = readStoredTouch(LAST_TOUCH_KEY);

  const firstTouch = first || touch;
  // Direct/internal revisits should not overwrite the most recent acquisition source.
  const lastTouch = meaningful || !last ? touch : last;

  if (!first) writeStoredTouch(FIRST_TOUCH_KEY, firstTouch);
  if (meaningful || !last) writeStoredTouch(LAST_TOUCH_KEY, lastTouch);

  return {
    sessionId: getSessionId(),
    referenceCode: getLeadReference(),
    firstTouch,
    lastTouch,
  };
}

export function getAttributionSnapshot(): AttributionSnapshot {
  const captured = captureAttribution();
  return {
    ...captured,
    firstTouch: readStoredTouch(FIRST_TOUCH_KEY) || captured.firstTouch,
    lastTouch: readStoredTouch(LAST_TOUCH_KEY) || captured.lastTouch,
  };
}

/** Database-ready fields for contact_inquiries and anonymous marketing events. */
export function getAttributionPayload() {
  const snapshot = getAttributionSnapshot();
  const first = snapshot.firstTouch;
  const last = snapshot.lastTouch;

  return {
    session_id: snapshot.sessionId || null,
    reference_code: snapshot.referenceCode || null,

    first_source: first.source || null,
    first_medium: first.medium || null,
    first_campaign: first.campaign || null,
    first_term: first.term || null,
    first_content: first.content || null,
    first_gclid: first.gclid || null,
    first_gbraid: first.gbraid || null,
    first_wbraid: first.wbraid || null,
    first_landing_page: first.landingPage || null,
    first_referrer: first.referrer || null,

    last_source: last.source || null,
    last_medium: last.medium || null,
    last_campaign: last.campaign || null,
    last_term: last.term || null,
    last_content: last.content || null,
    last_gclid: last.gclid || null,
    last_gbraid: last.gbraid || null,
    last_wbraid: last.wbraid || null,
    last_landing_page: last.landingPage || null,
    last_referrer: last.referrer || null,
  };
}

