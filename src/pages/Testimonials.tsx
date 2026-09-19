import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import { TESTIMONIALS } from "@/lib/constants";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  city: string | null;
}

const Testimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("id, name, text, rating, city")
        .eq("is_visible", true)
        .order("sort_order");
      if (data && data.length > 0) {
        setItems(data);
      }
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  const displayItems = items.length > 0
    ? items
    : TESTIMONIALS.map((t, i) => ({ id: `static-${i}`, ...t }));

  return (
    <>
      <Helmet>
        <title>آراء وتقييمات عملاء مؤسسة لمس لنقل الأثاث بالرياض</title>
        <meta name="description" content="اقرأ تقييمات عملائنا الحقيقية عن خدمات نقل الأثاث بالرياض. أكثر من 1000 عميل راضٍ. مؤسسة لمس - ثقة عملائنا أولوية." />
        <meta name="keywords" content="تقييمات نقل أثاث, آراء عملاء شركة نقل عفش, تجارب نقل أثاث بالرياض, تقييم مؤسسة لمس, أفضل شركة نقل عفش" />
        <link rel="canonical" href="https://lams.sooftit.com/testimonials" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/testimonials" />
        <meta property="og:title" content="آراء وتقييمات عملاء مؤسسة لمس لنقل الأثاث بالرياض" />
        <meta property="og:description" content="اقرأ تقييمات عملائنا الحقيقية عن خدمات نقل الأثاث بالرياض. أكثر من 1000 عميل راضٍ." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="آراء وتقييمات عملاء مؤسسة لمس لنقل الأثاث بالرياض" />
        <meta name="twitter:description" content="اقرأ تقييمات عملائنا الحقيقية عن خدمات نقل الأثاث بالرياض." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
      </Helmet>
      <div>
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4">آراء العملاء</h1>
            <p className="text-lg text-white/80">ما يقوله عملاؤنا عن تجربتهم مع مؤسسة لمس لنقل الأثاث</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">جاري التحميل...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayItems.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-gold transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} className={`h-4 w-4 ${si < t.rating ? "text-secondary fill-secondary" : "text-muted"}`} />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">"{t.text}"</p>
                      <div className="flex items-center gap-2 pt-3 border-t border-border">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary text-sm">{t.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-bold text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.city}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
};

export default Testimonials;
