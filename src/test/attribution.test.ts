import { beforeEach, describe, expect, it } from "vitest";
import { captureAttribution, getAttributionPayload, getLeadReference } from "@/lib/attribution";

describe("attribution", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  it("captures Google Ads click ids as google/cpc", () => {
    window.history.replaceState({}, "", "/?gclid=test-click&utm_campaign=riyadh-moving&utm_term=move");
    const snapshot = captureAttribution();

    expect(snapshot.firstTouch.source).toBe("google");
    expect(snapshot.firstTouch.medium).toBe("cpc");
    expect(snapshot.firstTouch.gclid).toBe("test-click");
    expect(snapshot.firstTouch.campaign).toBe("riyadh-moving");
  });

  it("preserves first touch while exposing database-ready fields", () => {
    window.history.replaceState({}, "", "/?utm_source=facebook&utm_medium=social&utm_campaign=offer");
    captureAttribution();
    window.history.replaceState({}, "", "/contact");

    const payload = getAttributionPayload();
    expect(payload.first_source).toBe("facebook");
    expect(payload.first_medium).toBe("social");
    expect(payload.first_campaign).toBe("offer");
    expect(payload.session_id).toBeTruthy();
    expect(payload.reference_code).toMatch(/^LMS-/);
  });

  it("keeps one stable internal lead reference for the session", () => {
    const first = getLeadReference();
    const second = getLeadReference();
    expect(first).toMatch(/^LMS-/);
    expect(second).toBe(first);
  });
});
