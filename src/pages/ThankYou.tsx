import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { trackEvent } from "@/lib/tracking";
import { getLeadReference } from "@/lib/attribution";

const ThankYou = () => {
  const { settings: COMPANY } = useCompanySettings();
  const referenceCode = getLeadReference();

  useEffect(() => {
    // Only track thank-you view when it follows an actual successful form submit
    let submitted = false;
    try {
      submitted = sessionStorage.getItem("lams_form_submitted") === "1";
      if (submitted) sessionStorage.removeItem("lams_form_submitted");
    } catch {
      // sessionStorage may be unavailable in restricted browser contexts.
    }
    if (submitted) trackEvent("thank_you_page_view");
  }, []);

  return (
    <>
      <Helmet>
        <title>تم استلام طلبك | مؤسسة لمس لنقل الأثاث</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container max-w-lg text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
            <CheckCircle2 className="h-24 w-24 text-[#25D366] mx-auto mb-6" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="text-3xl font-black mb-4">تم استلام طلبك بنجاح!</h1>
            <p className="text-muted-foreground text-lg mb-3">شكراً لتواصلك معنا. سنتواصل معك في أقرب وقت ممكن لتأكيد الموعد وتفاصيل الخدمة.</p>
            {referenceCode && <p className="text-sm text-muted-foreground mb-8">رقم المتابعة: <strong dir="ltr">{referenceCode}</strong></p>}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
              <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1da851] text-white font-bold">
                <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp">
                  <MessageCircle className="ml-2 h-5 w-5" /> تواصل عبر واتساب
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone">
                  <Phone className="ml-2 h-5 w-5" /> اتصل بنا
                </a>
              </Button>
            </div>
            <Button asChild variant="ghost" className="font-bold">
              <Link to="/"><Home className="ml-2 h-4 w-4" /> العودة للرئيسية</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ThankYou;
