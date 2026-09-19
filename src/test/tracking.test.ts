import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/leadTracking", () => ({
  logLeadInteraction: vi.fn().mockResolvedValue(undefined),
}));

import { initAdsConversionTracking, trackEvent } from "@/lib/tracking";

describe("tracking", () => {
  let calls: unknown[][];

  beforeEach(() => {
    calls = [];
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.dataLayer = [];
    window.gtag = ((...args: unknown[]) => {
      calls.push(args);
      const params = args[2] as { event_callback?: () => void } | undefined;
      if (args[1] === "conversion" && params?.event_callback) params.event_callback();
    }) as typeof window.gtag;
  });

  it("sends a custom event exactly once", () => {
    trackEvent("click_phone");
    expect(calls.filter((c) => c[1] === "click_phone")).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(0);
  });

  it("fires one click_phone and one conversion per phone click", () => {
    const cleanup = initAdsConversionTracking();
    const a = document.createElement("a");
    a.href = "tel:+966503689200";
    a.setAttribute("data-ads-conversion", "phone");
    document.body.appendChild(a);

    const nav = vi.fn();
    const originalLocation = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, set href(v: string) { nav(v); } },
    });

    a.click();

    expect(calls.filter((c) => c[1] === "click_phone")).toHaveLength(1);
    const conv = calls.filter((c) => c[1] === "conversion");
    expect(conv).toHaveLength(1);
    expect((conv[0][2] as { send_to: string }).send_to).toBe("AW-18432449326/JUDECI6mjPIcEK62o9VE");
    expect(nav).toHaveBeenCalledTimes(1);

    a.remove();
    cleanup();
  });

  it("fires one click_whatsapp and one conversion per whatsapp click", () => {
    const cleanup = initAdsConversionTracking();
    const a = document.createElement("a");
    a.href = "https://wa.me/966503689200";
    a.target = "_blank";
    a.setAttribute("data-ads-conversion", "whatsapp");
    document.body.appendChild(a);

    a.addEventListener("click", (e) => e.preventDefault());
    a.click();

    expect(calls.filter((c) => c[1] === "click_whatsapp")).toHaveLength(1);
    const conv = calls.filter((c) => c[1] === "conversion");
    expect(conv).toHaveLength(1);
    expect((conv[0][2] as { send_to: string }).send_to).toBe("AW-18432449326/2ChoCJukjPIcEK62o9VE");
    expect(new URL(a.href).searchParams.get("text")).toBeNull();

    a.remove();
    cleanup();
  });

  it("tracks get quote clicks without firing an Ads conversion", () => {
    const cleanup = initAdsConversionTracking();
    const a = document.createElement("a");
    a.href = "/get-quote";
    a.setAttribute("data-lead-action", "get_quote");
    document.body.appendChild(a);
    a.addEventListener("click", (e) => e.preventDefault());

    a.click();

    expect(calls.filter((c) => c[1] === "click_get_quote")).toHaveLength(1);
    expect(calls.filter((c) => c[1] === "conversion")).toHaveLength(0);

    a.remove();
    cleanup();
  });
});
