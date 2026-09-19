import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Target, Eye, Award } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Helmet>
        <title>من نحن - مؤسسة لمس لنقل الأثاث بالرياض | خبرة +10 سنوات</title>
        <meta name="description" content="تعرف على مؤسسة لمس لنقل الأثاث بالرياض. خبرة أكثر من 10 سنوات في نقل العفش والأثاث مع فريق محترف وسيارات مجهزة. أكثر من 1000 عميل راضٍ." />
        <meta name="keywords" content="من نحن مؤسسة لمس, شركة نقل أثاث بالرياض, نقل عفش بالرياض, فريق نقل محترف, سيارات نقل مجهزة, خبرة نقل أثاث" />
        <link rel="canonical" href="https://lams.sooftit.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/about" />
        <meta property="og:title" content="من نحن - مؤسسة لمس لنقل الأثاث بالرياض" />
        <meta property="og:description" content="تعرف على مؤسسة لمس لنقل الأثاث بالرياض. خبرة أكثر من 10 سنوات في نقل العفش والأثاث مع فريق محترف وسيارات مجهزة." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="من نحن - مؤسسة لمس لنقل الأثاث بالرياض" />
        <meta name="twitter:description" content="تعرف على مؤسسة لمس لنقل الأثاث بالرياض. خبرة أكثر من 10 سنوات مع فريق محترف وسيارات مجهزة." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://lams.sooftit.com/" },
            { "@type": "ListItem", "position": 2, "name": "من نحن", "item": "https://lams.sooftit.com/about" }
          ]
        })}</script>
      </Helmet>
      <div>
      {/* Hero */}
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4">من نحن</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              تعرّف على مؤسسة لمس لنقل الأثاث - شريكك الموثوق في خدمات النقل الاحترافية بالرياض والمملكة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-foreground mb-6">قصتنا</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  تأسست مؤسسة لمس لنقل الأثاث في الرياض بهدف تقديم خدمة نقل أثاث استثنائية تجمع بين الاحترافية والأمان والسرعة. منذ انطلاقتنا، وضعنا نصب أعيننا أن نكون الخيار الأول لكل من يبحث عن شركة نقل أثاث موثوقة في الرياض.
                </p>
                <p>
                  نؤمن بأن نقل الأثاث ليس مجرد عملية نقل عادية، بل هو نقل لذكريات وممتلكات ثمينة تستحق أعلى درجات العناية والاهتمام. لذلك نحرص على استخدام أفضل مواد التغليف وأحدث السيارات المجهزة.
                </p>
                <p>
                  فريقنا المدرب يتعامل مع كل قطعة أثاث بعناية فائقة، من لحظة الفك والتغليف حتى التركيب النهائي في موقعك الجديد.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-muted rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "+1000", label: "عميل راضٍ" },
                  { num: "+10", label: "سنوات خبرة" },
                  { num: "+50", label: "سيارة مجهزة" },
                  { num: "24/7", label: "خدمة متاحة" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4">
                    <div className="text-3xl font-black text-secondary mb-1">{s.num}</div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container">
          <SectionHeading title="قيمنا ورسالتنا" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Target, title: "رسالتنا", desc: "تقديم خدمة نقل أثاث متميزة تفوق توقعات عملائنا وتحقق رضاهم التام" },
              { icon: Eye, title: "رؤيتنا", desc: "أن نكون الشركة الرائدة والمرجع الأول في خدمات نقل الأثاث بالمملكة" },
              { icon: Award, title: "قيمنا", desc: "الأمانة، الاحترافية، الالتزام بالمواعيد، والحرص على تقديم أفضل تجربة" },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 text-center border border-border"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold-gradient text-center">
        <div className="container">
          <h2 className="text-3xl font-black text-primary mb-4">هل تحتاج خدمة نقل أثاث؟</h2>
          <p className="text-primary/80 mb-6">تواصل معنا الآن واحصل على عرض سعر مجاني</p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold">
            <Link to="/contact">تواصل معنا</Link>
          </Button>
        </div>
      </section>
      </div>
    </>
  );
};

export default About;
