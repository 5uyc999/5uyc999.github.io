import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQ = async () => {
      const { data } = await supabase
        .from("faq_items")
        .select("id, question, answer")
        .eq("is_visible", true)
        .order("sort_order");
      if (data && data.length > 0) {
        setItems(data);
      }
      setLoading(false);
    };
    fetchFAQ();
  }, []);

  // Use DB data if available, otherwise fallback to static
  const displayItems = items.length > 0
    ? items.map((item) => ({ q: item.question, a: item.answer, key: item.id }))
    : FAQ_ITEMS.map((item, i) => ({ q: item.q, a: item.a, key: `static-${i}` }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": displayItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>الأسئلة الشائعة عن نقل الأثاث بالرياض | مؤسسة لمس</title>
        <meta name="description" content="إجابات على أكثر الأسئلة شيوعاً حول نقل الأثاث بالرياض: الأسعار، التغليف، فك وتركيب، ضمان السلامة. كل ما تحتاج معرفته قبل نقل عفشك." />
        <meta name="keywords" content="أسئلة نقل أثاث, كم تكلفة نقل العفش, هل يوجد ضمان نقل أثاث, طريقة نقل الأثاث, نصائح نقل عفش, أسعار نقل أثاث بالرياض" />
        <link rel="canonical" href="https://lams.sooftit.com/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/faq" />
        <meta property="og:title" content="الأسئلة الشائعة عن نقل الأثاث بالرياض | مؤسسة لمس" />
        <meta property="og:description" content="إجابات على أكثر الأسئلة شيوعاً حول نقل الأثاث بالرياض: الأسعار، التغليف، فك وتركيب، ضمان السلامة." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="الأسئلة الشائعة عن نقل الأثاث بالرياض | مؤسسة لمس" />
        <meta name="twitter:description" content="إجابات على أكثر الأسئلة شيوعاً حول نقل الأثاث بالرياض." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div>
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4">الأسئلة الشائعة</h1>
            <p className="text-lg text-white/80">إجابات على أكثر الأسئلة شيوعاً حول خدمات نقل الأثاث بالرياض</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">جاري التحميل...</div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {displayItems.map((item) => (
                <AccordionItem key={item.key} value={item.key} className="bg-card rounded-lg border border-border px-6">
                  <AccordionTrigger className="text-right font-bold hover:text-secondary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>
      </div>
    </>
  );
};

export default FAQ;
