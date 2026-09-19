import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Send, Shield, Clock, Users, BadgeDollarSign, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";
import { getAttributionPayload } from "@/lib/attribution";
import { logLeadInteraction } from "@/lib/leadTracking";
import { TESTIMONIALS } from "@/lib/constants";

const benefits = [
  { icon: Users, title: "عمالة مدربة", desc: "فريق محترف ومؤهل" },
  { icon: Shield, title: "تغليف احترافي", desc: "حماية كاملة لأثاثك" },
  { icon: Clock, title: "التزام بالمواعيد", desc: "ننجز في الوقت المحدد" },
  { icon: BadgeDollarSign, title: "أسعار تنافسية", desc: "أفضل قيمة مقابل السعر" },
];

const GetQuote = () => {
  const { settings: COMPANY } = useCompanySettings();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", service_type: "", from_neighborhood: "", to_neighborhood: "", moving_date: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
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
      form_type: "get_quote",
      ...attribution,
    });

    setLoading(false);
    if (error) {
      toast({ title: "حدث خطأ", description: "يرجى المحاولة مرة أخرى", variant: "destructive" });
    } else {
      trackEvent("form_submit", { form_type: "get_quote" });
      void logLeadInteraction("form_submit", { formType: "get_quote" });
      try { sessionStorage.setItem("lams_form_submitted", "1"); } catch { /* sessionStorage may be unavailable */ }
      navigate("/thank-you");
    }
  };

  return (
    <>
      <Helmet>
        <title>طلب عرض سعر نقل أثاث بالرياض مجاناً | مؤسسة لمس</title>
        <meta name="description" content="احصل على عرض سعر مجاني لنقل أثاثك بالرياض. نقل عفش داخل وخارج الرياض مع فك وتركيب وتغليف احترافي. اتصل الآن 0503689200!" />
        <meta name="keywords" content="عرض سعر نقل عفش, اسعار نقل أثاث بالرياض, تكلفة نقل عفش, عرض سعر مجاني نقل أثاث, كم سعر نقل العفش, اسعار شركات نقل الاثاث" />
        <link rel="canonical" href="https://lams.sooftit.com/get-quote" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/get-quote" />
        <meta property="og:title" content="طلب عرض سعر نقل أثاث بالرياض مجاناً | مؤسسة لمس" />
        <meta property="og:description" content="احصل على عرض سعر مجاني لنقل أثاثك بالرياض. نقل عفش داخل وخارج الرياض مع فك وتركيب وتغليف احترافي." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="طلب عرض سعر نقل أثاث بالرياض مجاناً | مؤسسة لمس" />
        <meta name="twitter:description" content="احصل على عرض سعر مجاني لنقل أثاثك بالرياض مع فك وتركيب وتغليف." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
      </Helmet>

      <div>
        {/* Hero */}
        <section className="bg-navy-gradient text-white py-12 md:py-16">
          <div className="container text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl md:text-5xl font-black mb-4">نقل عفش بالرياض بسرعة وأمان وبأسعار مناسبة</h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">فك وتركيب وتغليف ونقل داخل وخارج الرياض - فريق محترف وسيارات مجهزة</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1da851] text-white text-lg font-black px-8 h-14 rounded-xl">
                  <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp">
                    <MessageCircle className="ml-2 h-6 w-6" /> واتساب الآن
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground text-lg font-black px-8 h-14 rounded-xl">
                  <a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone">
                    <Phone className="ml-2 h-6 w-6" /> اتصل الآن
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-10 bg-muted">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-4">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                    <b.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm">{b.title}</h3>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-12 md:py-16">
          <div className="container max-w-2xl">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-2 text-center">احصل على عرض سعر مجاني</h2>
                <p className="text-muted-foreground text-center mb-2">املأ النموذج وسنتواصل معك خلال دقائق</p>
                <p className="text-xs text-center text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mb-6">خدماتنا للنقل والفك والتركيب والتغليف فقط — لا نشتري أو نبيع الأثاث المستعمل.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">الاسم *</label>
                      <Input required placeholder="أدخل اسمك" maxLength={100} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">رقم الجوال *</label>
                      <Input required type="tel" placeholder="05XXXXXXXX" maxLength={15} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">نوع الخدمة</label>
                    <Select value={form.service_type} onValueChange={v => setForm({ ...form, service_type: v })}>
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">الحي الحالي</label>
                      <Input placeholder="مثال: حي النرجس" maxLength={100} value={form.from_neighborhood} onChange={e => setForm({ ...form, from_neighborhood: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">الحي الجديد</label>
                      <Input placeholder="مثال: حي الياسمين" maxLength={100} value={form.to_neighborhood} onChange={e => setForm({ ...form, to_neighborhood: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">موعد النقل المطلوب</label>
                    <Input type="date" value={form.moving_date} onChange={e => setForm({ ...form, moving_date: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">ملاحظات إضافية</label>
                    <Textarea placeholder="مثال: شقة 3 غرف - الدور الثاني..." rows={3} maxLength={1000} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <Button type="submit" size="lg" className="w-full font-bold text-lg h-14" disabled={loading}>
                    <Send className="ml-2 h-5 w-5" />
                    {loading ? "جاري الإرسال..." : "أرسل طلبك الآن"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 bg-muted">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">ماذا يقول عملاؤنا</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {TESTIMONIALS.slice(0, 3).map((t, i) => (
                <Card key={i} className="hover:shadow-gold transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} className={`h-4 w-4 ${si < t.rating ? "text-secondary fill-secondary" : "text-muted"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">"{t.text}"</p>
                    <p className="text-sm font-bold">{t.name} - <span className="text-muted-foreground font-normal">{t.city}</span></p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 bg-primary text-primary-foreground text-center">
          <div className="container">
            <h2 className="text-2xl font-bold mb-4">لا تتردد، تواصل معنا الآن!</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[#25D366] text-white font-bold text-lg px-8 h-14">
                <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp">
                  <MessageCircle className="ml-2 h-5 w-5" /> واتساب
                </a>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary font-bold text-lg px-8 h-14">
                <a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone">
                  <Phone className="ml-2 h-5 w-5" /> {COMPANY.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GetQuote;
