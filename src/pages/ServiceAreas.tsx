import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { Link } from "react-router-dom";
import { FEATURED_NEIGHBORHOOD_LINKS, FEATURED_SECTOR_LINKS } from "@/lib/seoClusters";

const areas = [
  {
    region: "شمال الرياض",
    slug: "north",
    note: "أحياء الشمال فيها فلل وشقق حديثة، ويكثر فيها طلب",
    focus: { label: "نقل الفلل مع الفك والتركيب", href: "/services/villa-moving-riyadh" },
    neighborhoods: ["حي النرجس", "حي الياسمين", "حي الملقا", "حي العارض", "حي النخيل", "حي الصحافة", "حي الربيع", "حي الغدير"],
  },
  {
    region: "شرق الرياض",
    slug: "east",
    note: "معظم النقلات في الشرق بين الشقق، لذلك غالباً يُطلب",
    focus: { label: "نقل شقق بالرياض", href: "/services/apartment-moving-riyadh" },
    neighborhoods: ["حي الرمال", "حي المونسية", "حي النسيم", "حي الروابي", "حي الريان", "حي اليرموك", "حي الحمراء", "حي السلي"],
  },
  {
    region: "غرب الرياض",
    slug: "west",
    note: "المسافات في الغرب متفاوتة، وتساعد فيها",
    focus: { label: "دينا نقل عفش بالرياض", href: "/services/dyna-moving-riyadh" },
    neighborhoods: ["حي العريجاء", "حي ظهرة لبن", "حي الشفا", "حي عرقة", "حي السويدي", "حي لبن", "حي نمار", "حي الحزم"],
  },
  {
    region: "جنوب الرياض",
    slug: "south",
    note: "كثير من طلبات الجنوب تكون لقطع محدودة، ويناسبها",
    focus: { label: "نقل قطعة أثاث بالرياض", href: "/services/single-item-moving-riyadh" },
    neighborhoods: ["حي الدار البيضاء", "حي المروة", "حي الشفا", "حي العزيزية", "حي الفيصلية", "حي بدر", "حي المصانع", "حي الدفاع"],
  },
  {
    region: "وسط الرياض",
    slug: "central",
    note: "الوسط منطقة مكاتب وشركات، ولهذا يكثر فيه طلب",
    focus: { label: "نقل مكاتب بالرياض", href: "/services/office-moving" },
    neighborhoods: ["حي العليا", "حي السليمانية", "حي الملك فهد", "حي المرسلات", "حي المربع", "حي الوزارات", "حي البطحاء", "حي الديرة"],
  },
];

const ServiceAreas = () => {
  const { settings: COMPANY } = useCompanySettings();

  return (
    <>
      <Helmet>
        <title>مناطق خدمة نقل الأثاث | الرياض والخرج والمزاحمية | مؤسسة لمس</title>
        <meta name="description" content="نخدم الرياض والخرج والمزاحمية في نقل الأثاث والعفش مع الفك والتركيب والتغليف، إضافة إلى جميع أحياء الرياض. تواصل معنا لعرض سعر." />
        <meta name="keywords" content="نقل عفش الرياض, نقل عفش الخرج, نقل عفش المزاحمية, نقل أثاث الرياض, نقل أثاث الخرج, نقل أثاث المزاحمية, فك وتركيب أثاث" />
        <link rel="canonical" href="https://lams.sooftit.com/service-areas" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/service-areas" />
        <meta property="og:title" content="مناطق خدمة نقل الأثاث | الرياض والخرج والمزاحمية | مؤسسة لمس" />
        <meta property="og:description" content="نخدم الرياض والخرج والمزاحمية بخدمات نقل وفك وتركيب وتغليف الأثاث." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="مناطق خدمة نقل الأثاث بالرياض | مؤسسة لمس" />
        <meta name="twitter:description" content="نغطي جميع أحياء الرياض بخدمات نقل أثاث احترافية وسريعة." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
      </Helmet>

      <div>
        <section className="bg-navy-gradient text-white py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black mb-4">مناطق خدمة نقل الأثاث</h1>
              <p className="text-lg text-white/80">نخدم الرياض والخرج والمزاحمية، مع تغطية جميع أحياء الرياض وخدمات الفك والتركيب والتغليف</p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 border-b border-border">
          <div className="container">
            <h2 className="text-2xl font-black mb-5">اختر مدينتك</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "الرياض", slug: "riyadh", desc: "نقل عفش داخل جميع أحياء الرياض" },
                { name: "الخرج", slug: "al-kharj", desc: "نقل أثاث داخل الخرج وبين الخرج والرياض" },
                { name: "المزاحمية", slug: "al-muzahimiyah", desc: "نقل أثاث داخل المزاحمية وبينها وبين الرياض" },
              ].map((city) => (
                <Link key={city.slug} to={`/areas/${city.slug}`} className="block">
                  <Card className="h-full hover:border-secondary hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2"><MapPin className="h-5 w-5 text-secondary" /><h3 className="font-black text-lg">نقل عفش {city.name}</h3></div>
                      <p className="text-sm text-muted-foreground">{city.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="riyadh-neighborhoods" className="py-16 md:py-20">
          <div className="container">
            <h2 className="text-3xl font-black mb-3">أحياء الرياض التي نخدمها</h2>
            <p className="text-muted-foreground mb-4 max-w-3xl">
              تنظيم التغطية عندنا بسيط: تبدأ من صفحة{" "}
              <Link to="/areas/riyadh" className="font-bold text-primary hover:text-secondary underline underline-offset-4">نقل عفش الرياض</Link>{" "}
              ثم تختار منطقتك (شمال، شرق، غرب، جنوب أو وسط الرياض)، ومنها تصل إلى صفحة الحي الذي تنقل منه أو إليه.
            </p>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              وفي كل الحالات تبقى الخدمات نفسها:{" "}
              <Link to="/services/moving-inside-riyadh" className="font-bold text-primary hover:text-secondary underline underline-offset-4">نقل الأثاث داخل الرياض</Link>،{" "}
              <Link to="/services/packing" className="font-bold text-primary hover:text-secondary underline underline-offset-4">تغليف الأثاث</Link>،{" "}
              <Link to="/services/assembly-disassembly" className="font-bold text-primary hover:text-secondary underline underline-offset-4">الفك والتركيب</Link>، و
              <Link to="/services/office-moving" className="font-bold text-primary hover:text-secondary underline underline-offset-4">نقل المكاتب</Link>.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
              {FEATURED_SECTOR_LINKS.map((item) => (
                <Link key={item.href} to={item.href} className="rounded-xl border bg-card p-4 font-bold hover:border-secondary hover:text-secondary transition-colors">{item.label}</Link>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {FEATURED_NEIGHBORHOOD_LINKS.map((item) => (
                <Link key={item.href} to={item.href} className="rounded-xl border p-4 font-bold hover:border-secondary hover:text-secondary transition-colors">{item.label}</Link>
              ))}
            </div>
            <div className="space-y-12">
              {areas.map((area, i) => (
                <motion.div key={area.region} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/areas/riyadh/${area.slug}`} className="inline-flex items-center gap-2 mb-4 hover:text-secondary transition-colors">
                    <MapPin className="h-6 w-6 text-secondary" />
                    <h2 className="text-2xl font-bold">نقل عفش {area.region}</h2>
                  </Link>
                  <p className="text-muted-foreground mb-4 max-w-3xl">
                    {area.note}{" "}
                    <Link to={area.focus.href} className="font-bold text-primary hover:text-secondary underline underline-offset-4">{area.focus.label}</Link>.{" "}
                    <Link to={`/areas/riyadh/${area.slug}`} className="font-bold text-primary hover:text-secondary underline underline-offset-4">تفاصيل خدمة {area.region}</Link>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {area.neighborhoods.map(n => (
                      <Card key={n} className="hover:border-secondary transition-colors">
                        <CardContent className="p-4 text-center">
                          <p className="font-bold text-sm">{n}</p>
                          <p className="text-xs text-muted-foreground mt-1">نقل أثاث متاح</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gold-gradient text-center">
          <div className="container">
            <h2 className="text-3xl font-black text-primary mb-4">حيّك مش موجود؟ لا تقلق!</h2>
            <p className="text-primary/80 mb-6">نغطي جميع أحياء الرياض بدون استثناء. تواصل معنا وأخبرنا بموقعك</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold">
                <a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone"><Phone className="ml-2 h-5 w-5" /> اتصل الآن</a>
              </Button>
              <Button asChild size="lg" className="bg-[#25D366] text-white font-bold">
                <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp"><MessageCircle className="ml-2 h-5 w-5" /> واتساب</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary font-bold">
                <Link to="/get-quote" data-lead-action="get_quote">طلب عرض سعر</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceAreas;
