import { supabase } from "@/integrations/supabase/client";
import { getAttributionPayload } from "@/lib/attribution";

export type LeadInteractionType =
  | "phone_click"
  | "whatsapp_click"
  | "get_quote_click"
  | "form_submit";

/**
 * Best-effort anonymous interaction logging.
 * Failures are intentionally swallowed so tracking can never block a call/WhatsApp click.
 */
export async function logLeadInteraction(
  eventType: LeadInteractionType,
  extra?: { formType?: string; currentPage?: string },
) {
  if (typeof window === "undefined") return;

  try {
    const attribution = getAttributionPayload();
    await supabase.from("lead_interactions").insert({
      event_type: eventType,
      form_type: extra?.formType || null,
      current_page: (extra?.currentPage || `${window.location.pathname}${window.location.search}`).slice(0, 1000),
      ...attribution,
    });
  } catch {
    // Do not surface analytics errors to visitors.
  }
}
