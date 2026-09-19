import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RelatedSeoLinks from "@/components/seo/RelatedSeoLinks";
import { RIYADH_SECTORS } from "@/lib/seoClusters";
import { useCompanySettings } from "@/hooks/useCompanySettings";

const SITE_URL = "https://lams.sooftit.com";

const RiyadhSector = () => {
  const { slug } = useParams();
  const sector = slug ? RIYADH_SECTORS[slug] : undefined;
  const { settings: COMPANY } = useCompanySettings();

  if (!sector) return <Navigate to="/service-areas" replace />;

  const canonical = `${SITE_URL}/areas/riyadh/${sector.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `نقل عفش ${sector.name}`,
    description: sector.description,
    url: canonical,
    serviceType: ["نقل أثاث", "فك وتركيب أثاث", "تغليف أثاث"],
    areaServed: { "@type": "Place", name: `${sector.name}، الرياض` },
    provider: { "@type": "MovingCompany", name: "مؤسسة لمس لنقل الأثاث", url: SITE_URL, telephone: COMPANY.phone },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sector.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "مناطق الخدمة", item: `${SITE_URL}/service-areas` },
      { "@type": "ListItem", position: 3, name: "الرياض", item: `${SITE_URL}/areas/riyadh` },
      { "@type": "ListItem", position: 4, name: sector.name, item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{sector.title}</title>
        <meta name="description" content={sector.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={sector.title} />
        <meta property="og:description" content={sector.description} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:locale" content="ar_SA" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div>
        <section className="bg-navy-gradient text-white py-16 md:py-20">
          <div className="container max-w-5xl">
            <nav className="text-sm text-white/60 mb-5"><Link to="/" className="hover:text-secondary">الرئيسية</Link> / <Link to="/service-areas" className="hover:text-secondary">مناطق الخدمة</Link> / <Link to="/areas/riyadh" className="hover:text-secondary">الرياض</Link></nav>
            <p className="text-secondary font-bold mb-3 flex items-center gap-2"><MapPin className="h-5 w-5" /> {sector.name}</p>
            <h1 className="text-3xl md:text-5xl font-black mb-5">{sector.h1}</h1>
            <p className="text-lg text-white/80 leading-8 max-w-3xl">{sector.description}</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground font-bold"><a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone"><Phone className="ml-2 h-5 w-5" /> اتصل الآن</a></Button>
              <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1da851] text-white font-bold"><a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp"><MessageCircle className="ml-2 h-5 w-5" /> واتساب</a></Button>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container max-w-5xl grid lg:grid-cols-[1fr_300px] gap-10">
            <div>
              <div className="space-y-4 mb-10">{sector.intro.map((p) => <p key={p} className="text-lg text-muted-foreground leading-9">{p}</p>)}</div>

              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black mb-5">أحياء نخدمها في {sector.name}</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">{sector.neighborhoods.map((name) => <div key={name} className="rounded-xl border bg-card p-4 font-bold text-center">حي {name}</div>)}</div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black mb-5">معلومات تساعد على تنظيم النقل</h2>
                <div className="grid gap-3">{sector.planning.map((item) => <div key={item} className="flex items-start gap-3 p-4 bg-muted/60 rounded-xl"><CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" /><span>{item}</span></div>)}</div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black mb-5">خدمات مرتبطة</h2>
                <div className="grid sm:grid-cols-2 gap-4">{sector.suitableServices.map((item) => <Link key={item.href} to={item.href}><Card className="h-full hover:border-secondary transition-colors"><CardContent className="p-5 flex items-center justify-between gap-3"><span className="font-black">{item.label}</span><ArrowLeft className="h-4 w-4 text-secondary" /></CardContent></Card></Link>)}</div>
              </section>

              <section>
                <h2 className="text-2xl md:text-3xl font-black mb-5">أسئلة شائعة عن نقل العفش في {sector.name}</h2>
                <div className="space-y-3">{sector.faq.map((item) => <Card key={item.q}><CardContent className="p-5"><h3 className="font-black mb-2">{item.q}</h3><p className="text-muted-foreground leading-7">{item.a}</p></CardContent></Card>)}</div>
              </section>
            </div>

            <aside><Card className="sticky top-24"><CardContent className="p-5 space-y-4"><h2 className="text-xl font-black">اطلب تقديراً للنقل</h2><p className="text-sm text-muted-foreground leading-6">أرسل الحي الحالي والحي الجديد وكمية الأثاث والطابق والخدمات المطلوبة.</p><Button asChild className="w-full"><Link to="/get-quote" data-lead-action="get_quote">طلب عرض سعر</Link></Button><Button asChild variant="outline" className="w-full"><Link to="/service-areas">كل مناطق الخدمة</Link></Button></CardContent></Card></aside>
          </div>
        </section>

        <RelatedSeoLinks title="أدلة مفيدة قبل النقل" links={[
          { label: "أسعار نقل العفش بالرياض", href: "/guides/furniture-moving-prices-riyadh" },
          { label: "كيف تختار شركة نقل عفش؟", href: "/guides/choose-moving-company-riyadh" },
          { label: "قائمة تجهيز المنزل", href: "/guides/moving-checklist-riyadh" },
        ]} />
      </div>
    </>
  );
};

export default RiyadhSector;
