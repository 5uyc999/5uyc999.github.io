import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { convertToWebP } from "@/lib/imageUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { invalidateSettingsCache } from "@/hooks/useCompanySettings";

const settingSections = [
  {
    title: "بيانات المؤسسة",
    keys: [
      { key: "company_name", label: "اسم المؤسسة", type: "text" },
      { key: "company_name_short", label: "الاسم المختصر", type: "text" },
      { key: "company_description", label: "وصف المؤسسة", type: "textarea" },
      { key: "phone", label: "رقم الهاتف", type: "text" },
      { key: "whatsapp", label: "رقم الواتساب (مع رمز الدولة)", type: "text" },
      { key: "email", label: "البريد الإلكتروني", type: "text" },
      { key: "site_url", label: "رابط الموقع الرسمي (الدومين)", type: "text" },
      { key: "address", label: "العنوان", type: "text" },
      { key: "map_url", label: "رابط خريطة جوجل", type: "text" },
      { key: "working_hours", label: "ساعات العمل", type: "text" },
    ],
  },
  {
    title: "الشعار وصورة المشاركة",
    keys: [
      { key: "logo_url", label: "شعار المؤسسة", type: "file" },
      { key: "og_image_url", label: "صورة المشاركة (OG Image)", type: "file" },
    ],
  },
  {
    title: "السيو وتحسين محركات البحث",
    keys: [
      { key: "meta_title", label: "عنوان الموقع (Meta Title)", type: "text" },
      { key: "meta_description", label: "وصف الموقع (Meta Description)", type: "textarea" },
      { key: "meta_keywords", label: "الكلمات المفتاحية (مفصولة بفاصلة)", type: "textarea" },
    ],
  },
  {
    title: "روابط التواصل الاجتماعي",
    description: "اترك الحقل فارغاً لإخفاء الأيقونة من الفوتر",
    keys: [
      { key: "facebook", label: "رابط فيسبوك", type: "text" },
      { key: "twitter", label: "رابط تويتر/X", type: "text" },
      { key: "instagram", label: "رابط إنستغرام", type: "text" },
      { key: "tiktok", label: "رابط تيك توك", type: "text" },
      { key: "snapchat", label: "رابط سناب شات", type: "text" },
    ],
  },
];

const ltrKeys = ["phone", "whatsapp", "email", "site_url", "map_url", "facebook", "twitter", "instagram", "tiktok", "snapchat", "meta_keywords"];

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("company_settings").select("*");
      const map: Record<string, string> = {};
      (data || []).forEach((d) => { map[d.key] = d.value || ""; });
      setSettings(map);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleFileUpload = async (key: string, file: File) => {
    setUploading(key);
    try {
      const webpBlob = await convertToWebP(file);
      const path = `settings/${key}-${Date.now()}.webp`;
      const { error } = await supabase.storage.from("media").upload(path, webpBlob, { contentType: "image/webp" });
      if (error) {
        toast({ title: "خطأ في الرفع", description: error.message, variant: "destructive" });
        setUploading(null);
        return;
      }
      const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
      setSettings(prev => ({ ...prev, [key]: urlData.publicUrl }));
      toast({ title: "تم رفع الملف بنجاح (WebP) ✅" });
    } catch {
      toast({ title: "خطأ في تحويل الصورة", variant: "destructive" });
    }
    setUploading(null);
  };

  const handleSave = async () => {
    setSaving(true);
    const allKeys = settingSections.flatMap(s => s.keys.map(k => k.key));
    for (const key of allKeys) {
      const value = settings[key] || "";
      await supabase.from("company_settings").upsert({ key, value }, { onConflict: "key" });
    }
    invalidateSettingsCache();
    toast({ title: "تم حفظ الإعدادات بنجاح ✅" });
    setSaving(false);
  };

  if (loading) return <div className="text-center py-10">جاري التحميل...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      {settingSections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            {section.description && <p className="text-sm text-muted-foreground">{section.description}</p>}
          </CardHeader>
          <CardContent className="space-y-4">
            {section.keys.map(({ key, label, type }) => (
              <div key={key}>
                <label className="text-sm font-medium text-foreground block mb-1">{label}</label>
                {type === "file" ? (
                  <div className="space-y-2">
                    {settings[key] && (
                      <div className="relative w-32 h-32 rounded-lg border border-border overflow-hidden">
                        <img src={settings[key]} alt={label} className="w-full h-full object-contain bg-muted" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={`file-${key}`}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFileUpload(key, f);
                        }}
                      />
                      <label htmlFor={`file-${key}`} className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-muted transition-colors">
                        <Upload className="h-4 w-4" />
                        {uploading === key ? "جاري الرفع..." : settings[key] ? "تغيير" : "رفع صورة"}
                      </label>
                      {settings[key] && (
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setSettings(prev => ({ ...prev, [key]: "" }))}>
                          حذف
                        </Button>
                      )}
                    </div>
                  </div>
                ) : type === "textarea" ? (
                  <Textarea
                    value={settings[key] || ""}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <Input
                    value={settings[key] || ""}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    dir={ltrKeys.includes(key) ? "ltr" : "rtl"}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSave} disabled={saving} className="w-full bg-primary font-bold h-12">
        <Save className="ml-2 h-4 w-4" />
        {saving ? "جاري الحفظ..." : "حفظ جميع الإعدادات"}
      </Button>
    </div>
  );
};

export default AdminSettings;
