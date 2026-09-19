import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";
import { getAttributionPayload } from "@/lib/attribution";
import { logLeadInteraction } from "@/lib/leadTracking";

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { settings: COMPANY } = useCompanySettings();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service_type: "", from_neighborhood: "", to_neighborhood: "", moving_date: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const attribution = getAttributionPayload();
    const { error } = await supabase.from("contact_inquiries").insert({
      name: form.name,
      phone: form.phone,
      service_type: form.service_type || null,
      city: form.from_neighborhood || null,
      from_neighborhood: form.from_neighborhood || null,
      to_neighborhood: form.to_neighborhood || null,
      moving_date: form.moving_date || null,
      message: form.message || null,
      form_type: "contact",
      ...attribution,
    });
    setLoading(false);
    if (error) {
      toast({ title: "حدث خطأ", description: "يرجى المحاولة مرة أخرى", variant: "destructive" });
    } else {
      trackEvent("form_submit", { form_type: "contact" });
      void logLeadInteraction("form_submit", { formType: "contact" });
      try { sessionStorage.setItem("lams_form_submitted", "1"); } catch { /* sessionStorage may be unavailable */ }
      navigate("/thank-you");
    }
  };

  return (
    <>
      <Helmet>
        <title>اتصل بنا - مؤسسة لمس لنقل الأثاث بالرياض | 0503689200</title>
        <meta name="description" content="تواصل مع مؤسسة لمس لنقل الأثاث بالرياض. اتصل أو أرسل واتساب للحصول على عرض سعر مجاني لنقل عفش داخل وخارج الرياض. هاتف: 0503689200" />
        <meta name="keywords" content="اتصل بنا مؤسسة لمس, رقم شركة نقل عفش, واتساب نقل أثاث, تواصل نقل عفش بالرياض, عرض سعر نقل أثاث" />
        <link rel="canonical" href="https://lams.sooftit.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/contact" />
        <meta property="og:title" content="اتصل بنا - مؤسسة لمس لنقل الأثاث بالرياض" />
        <meta property="og:description" content="تواصل مع مؤسسة لمس لنقل الأثاث بالرياض. اتصل أو أرسل واتساب للحصول على عرض سعر مجاني." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="اتصل بنا - مؤسسة لمس لنقل الأثاث بالرياض" />
        <meta name="twitter:description" content="تواصل مع مؤسسة لمس لنقل الأثاث بالرياض. اتصل أو واتساب للحصول على عرض سعر مجاني." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
      </Helmet>

      <div>
        <section className="bg-navy-gradient text-white py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black mb-4">اتصل بنا</h1>
              <p className="text-lg text-white/80">نحن هنا لمساعدتك. تواصل معنا بأي طريقة تناسبك</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "الهاتف", values: [COMPANY.phone], links: [`tel:${COMPANY.phone}`], adsConversion: "phone" as const },
                  { icon: MessageCircle, label: "واتساب", values: [COMPANY.whatsapp], links: [`https://wa.me/${COMPANY.whatsapp}`], adsConversion: "whatsapp" as const },
                  { icon: Mail, label: "البريد", values: [COMPANY.email], links: [`mailto:${COMPANY.email}`], adsConversion: undefined },
                  { icon: MapPin, label: "العنوان", values: [COMPANY.address], links: [], adsConversion: undefined },
                  { icon: Clock, label: "ساعات العمل", values: [COMPANY.working_hours], links: [], adsConversion: undefined },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-sm mb-1">{item.label}</p>
                        {item.values.map((v, vi) => (
                          item.links[vi] ? (
                            <a key={vi} href={item.links[vi]} target={item.links[vi].startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-ads-conversion={item.adsConversion} className="block text-sm text-muted-foreground hover:text-secondary transition-colors">{v}</a>
                          ) : (
                            <p key={vi} className="text-sm text-muted-foreground">{v}</p>
                          )
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-2">أرسل لنا استفسارك</h2>
                    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mb-6">خدماتنا للنقل والفك والتركيب والتغليف فقط — لا نشتري أو نبيع الأثاث المستعمل.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">الاسم الكامل *</label>
                          <Input required placeholder="أدخل اسمك" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">رقم الهاتف *</label>
                          <Input required type="tel" placeholder="05XXXXXXXX" maxLength={15} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">نوع الخدمة</label>
                          <Select value={form.service_type} onValueChange={(v) => setForm({ ...form, service_type: v })}>
                            <SelectTrigger><SelectValue placeholder="اختر نوع الخدمة" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="نقل أثاث داخل الرياض">نقل أثاث داخل الرياض</SelectItem>
                              <SelectItem value="نقل أثاث خارج الرياض">نقل أثاث خارج الرياض</SelectItem>
                              <SelectItem value="فك وتركيب أثاث">فك وتركيب أثاث</SelectItem>
                              <SelectItem value="تغليف أثاث">تغليف أثاث</SelectItem>
                              <SelectItem value="نقل مكاتب">نقل مكاتب</SelectItem>
                              <SelectItem value="أخرى">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">موعد النقل</label>
                          <Input type="date" value={form.moving_date} onChange={(e) => setForm({ ...form, moving_date: e.target.value })} />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">الحي الحالي</label>
                          <Input placeholder="مثال: حي النرجس" maxLength={100} value={form.from_neighborhood} onChange={(e) => setForm({ ...form, from_neighborhood: e.target.value })} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">الحي الجديد</label>
                          <Input placeholder="مثال: حي الياسمين" maxLength={100} value={form.to_neighborhood} onChange={(e) => setForm({ ...form, to_neighborhood: e.target.value })} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">الرسالة</label>
                        <Textarea placeholder="اكتب تفاصيل طلبك هنا..." rows={4} maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                      </div>
                      <Button type="submit" size="lg" className="w-full font-bold" disabled={loading}>
                        <Send className="ml-2 h-5 w-5" />
                        {loading ? "جاري الإرسال..." : "إرسال الطلب"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12 rounded-2xl overflow-hidden border border-border">
              <iframe
                src={COMPANY.map_url}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع مؤسسة لمس لنقل الأثاث على الخريطة"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
