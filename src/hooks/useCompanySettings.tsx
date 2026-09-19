import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/lib/constants";

export interface CompanySettings {
  company_name: string;
  company_name_short: string;
  company_description: string;
  phone: string;
  whatsapp: string;
  email: string;
  site_url: string;
  address: string;
  map_url: string;
  working_hours: string;
  facebook: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  snapchat: string;
  logo_url: string;
  og_image_url: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

const defaults: CompanySettings = {
  company_name: COMPANY.name,
  company_name_short: COMPANY.nameShort,
  company_description: "",
  phone: COMPANY.phone,
  whatsapp: COMPANY.whatsapp,
  email: COMPANY.email,
  site_url: "",
  address: COMPANY.address,
  map_url: COMPANY.mapUrl,
  working_hours: COMPANY.workingHours,
  facebook: COMPANY.social.facebook,
  twitter: COMPANY.social.twitter,
  instagram: COMPANY.social.instagram,
  tiktok: COMPANY.social.tiktok,
  snapchat: COMPANY.social.snapchat,
  logo_url: "",
  og_image_url: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
};

let cachedSettings: CompanySettings | null = null;
let fetchPromise: Promise<CompanySettings> | null = null;

async function fetchSettings(): Promise<CompanySettings> {
  const { data } = await supabase.from("company_settings").select("key, value");
  const map: Record<string, string> = {};
  (data || []).forEach((d) => { map[d.key] = d.value || ""; });
  
  const result: CompanySettings = { ...defaults };
  for (const key of Object.keys(defaults) as Array<keyof CompanySettings>) {
    if (map[key]) result[key] = map[key];
  }
  cachedSettings = result;
  return result;
}

export function useCompanySettings() {
  const [settings, setSettings] = useState<CompanySettings>(cachedSettings || defaults);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings);
      setLoading(false);
      return;
    }
    if (!fetchPromise) fetchPromise = fetchSettings();
    fetchPromise.then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  return { settings, loading };
}

// Invalidate cache after admin saves
export function invalidateSettingsCache() {
  cachedSettings = null;
  fetchPromise = null;
}
