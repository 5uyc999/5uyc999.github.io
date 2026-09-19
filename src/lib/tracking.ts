/**
 * Event tracking utility - Google Ads + lightweight first-party lead attribution.
 * gtag.js is loaded once in index.html and configured with AW-18432449326.
 */

import { logLeadInteraction } from "@/lib/leadTracking";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type TrackingEvent =
  | "click_whatsapp"
  | "click_phone"
  | "form_submit"
  | "thank_you_page_view"
  | "click_get_quote"
  | "scroll_90";

export function trackEvent(event: TrackingEvent, params?: Record<string, string | number>) {
  // gtag() already pushes to dataLayer internally — never send the same event twice.
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params || {});
  }
}

/**
 * Google Ads conversion tracking (AW-18432449326)
 * Final conversion actions:
 *  - "ضغط اتصال - الموقع" (website click-to-call) -> phone
 *  - "ضغط واتساب - الموقع"                    -> whatsapp
 * The older "انقر للاتصال" conversion is intentionally NOT used by website code.
 * "المكالمات من الإعلانات" is managed by Google Ads, not by website code.
 */
const ADS_ACCOUNT_ID = "AW-18432449326";

const ADS_CONVERSION_LABELS: Record<"phone" | "whatsapp", string> = {
  phone: "JUDECI6mjPIcEK62o9VE",
  whatsapp: "2ChoCJukjPIcEK62o9VE",
};

export function fireAdsConversion(type: "phone" | "whatsapp") {
  const label = ADS_CONVERSION_LABELS[type];
  if (!label || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "conversion", {
    send_to: `${ADS_ACCOUNT_ID}/${label}`,
  });
}

/** Fires the phone conversion, then navigates to the tel: URL via callback + fallback. */
export function reportPhoneConversion(url?: string) {
  if (typeof window === "undefined") return;

  const navigate = () => {
    if (url) window.location.href = url;
  };

  if (!window.gtag) {
    navigate();
    return;
  }

  let completed = false;
  const callback = () => {
    if (completed) return;
    completed = true;
    navigate();
  };

  window.gtag("event", "conversion", {
    send_to: `${ADS_ACCOUNT_ID}/${ADS_CONVERSION_LABELS.phone}`,
    event_callback: callback,
    event_timeout: 2000,
  });

  window.setTimeout(callback, 2000);
}

let listenerInstalled = false;

/** Installs a single delegated click listener. Returns a cleanup function. */
export function initAdsConversionTracking() {
  if (typeof document === "undefined") return () => {};
  if (listenerInstalled) return () => {};
  listenerInstalled = true;

  const handler = (event: Event) => {
    const el = (event.target as HTMLElement)?.closest<HTMLElement>("[data-ads-conversion], [data-lead-action]");
    if (!el) return;

    const leadAction = el.getAttribute("data-lead-action");
    if (leadAction === "get_quote") {
      void logLeadInteraction("get_quote_click");
      trackEvent("click_get_quote");
    }

    const type = el.getAttribute("data-ads-conversion");
    if (!type) return;

    if (type === "whatsapp") {
      // Keep the WhatsApp composer empty. Attribution stays internal in lead_interactions.
      void logLeadInteraction("whatsapp_click");
      fireAdsConversion("whatsapp");
      trackEvent("click_whatsapp");
      return;
    }

    if (type === "phone") {
      const anchor = el.closest("a") as HTMLAnchorElement | null;
      const href = anchor?.getAttribute("href") ?? undefined;
      void logLeadInteraction("phone_click");
      trackEvent("click_phone");

      if (href && href.startsWith("tel:")) {
        event.preventDefault();
        reportPhoneConversion(href);
      } else {
        fireAdsConversion("phone");
      }
    }
  };

  document.addEventListener("click", handler, { capture: true });

  return () => {
    document.removeEventListener("click", handler, { capture: true } as EventListenerOptions);
    listenerInstalled = false;
  };
}
