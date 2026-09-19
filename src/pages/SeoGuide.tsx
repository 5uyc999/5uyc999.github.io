import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RelatedSeoLinks from "@/components/seo/RelatedSeoLinks";
import { SEO_GUIDES } from "@/lib/seoClusters";
import { useCompanySettings } from "@/hooks/useCompanySettings";

const SITE_URL = "https://lams.sooftit.com";

const SeoGuide = () => {
  const { slug } = useParams();
  const guide = slug ? SEO_GUIDES[slug] : undefined;
  const { settings: COMPANY } = useCompanySettings();

  if (!guide) return <Navigate to="/moving-guide" replace />;

  const canonical = `${SITE_URL}/guides/${guide.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    url: canonical,
    inLanguage: "ar-SA",
    author: { "@type": "Organization", name: "مؤسسة لمس لنقل الأثاث", url: SITE_URL },
    publisher: { "@type": "Organization", name: "مؤسسة لمس لنقل الأثاث", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-192.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "دليل نقل العفش", item: `${SITE_URL}/moving-guide` },
      { "@type": "ListItem", position: 3, name: guide.h1, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{guide.title}</title>
        <meta name="description" content={guide.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={guide.title} />
        <meta property="og:description" content={guide.description} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:locale" content="ar_SA" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <article>
        <section className="bg-navy-gradient text-white py-16 md:py-20">
          <div className="container max-w-5xl">
            <nav className="text-sm text-white/60 mb-5">
              <Link to="/" className="hover:text-secondary">الرئيسية</Link> / <Link to="/moving-guide" className="hover:text-secondary">دليل نقل العفش</Link>
            </nav>
            <p className="text-secondary font-bold mb-3">{guide.eyebrow}</p>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-5">{guide.h1}</h1>
            <p className="text-white/75 max-w-3xl leading-8">{guide.description}</p>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container max-w-5xl grid lg:grid-cols-[1fr_300px] gap-10">
            <div>
              <div className="space-y-4 mb-10">
                {guide.intro.map((p) => <p key={p} className="text-lg text-muted-foreground leading-9">{p}</p>)}
              </div>

              <div className="space-y-10">
                {guide.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl md:text-3xl font-black mb-4">{section.heading}</h2>
                    {section.paragraphs?.map((p) => <p key={p} className="text-muted-foreground leading-8 mb-4">{p}</p>)}
                    {section.bullets && (
                      <div className="grid gap-3">
                        {section.bullets.map((item) => (
                          <div key={item} className="flex items-start gap-3 rounded-xl bg-muted/60 p-4">
                            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="leading-7">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              <section className="mt-12">
                <h2 className="text-2xl md:text-3xl font-black mb-5">أسئلة شائعة</h2>
                <div className="space-y-3">
                  {guide.faq.map((item) => (
                    <Card key={item.q}>
                      <CardContent className="p-5">
                        <h3 className="font-black mb-2">{item.q}</h3>
                        <p className="text-muted-foreground leading-7">{item.a}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            <aside>
              <Card className="sticky top-24">
                <CardContent className="p-5 space-y-4">
                  <h2 className="text-xl font-black">تحتاج تنفيذ الخدمة؟</h2>
                  <p className="text-sm text-muted-foreground leading-6">أرسل تفاصيل الأثاث وموقع الاستلام والتسليم والخدمات المطلوبة للحصول على تقدير مناسب.</p>
                  <Button asChild className="w-full"><Link to="/get-quote" data-lead-action="get_quote">طلب عرض سعر <ArrowLeft className="mr-2 h-4 w-4" /></Link></Button>
                  <Button asChild variant="outline" className="w-full"><a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone"><Phone className="ml-2 h-4 w-4" /> اتصل الآن</a></Button>
                  <Button asChild className="w-full bg-[#25D366] hover:bg-[#1da851] text-white"><a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp"><MessageCircle className="ml-2 h-4 w-4" /> واتساب</a></Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>

        <RelatedSeoLinks title="اقرأ أيضاً" links={guide.related} />
      </article>
    </>
  );
};

export default SeoGuide;
