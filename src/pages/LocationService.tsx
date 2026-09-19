import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2, MapPin, MessageCircle, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import RelatedSeoLinks from "@/components/seo/RelatedSeoLinks";
import { FEATURED_NEIGHBORHOOD_LINKS } from "@/lib/seoClusters";

const SITE_URL = "https://lams.sooftit.com";

type LocationData = {
  slug: string;
  city: string;
  title: string;
  description: string;
  intro: string;
  localNote: string;
  areas: string[];
  faq: Array<{ q: string; a: string }>;
};

const locations: Record<string, LocationData> = {
  riyadh: {
    slug: "riyadh",
    city: "الرياض",
    title: "نقل عفش بالرياض | فك وتركيب وتغليف الأثاث | مؤسسة لمس",
    description: "خدمة نقل عفش بالرياض مع فك وتركيب وتغليف الأثاث وسيارات مجهزة. نخدم شمال وشرق وغرب وجنوب ووسط الرياض. تواصل مع مؤسسة لمس لعرض سعر.",
    intro: "نوفر خدمة نقل أثاث داخل الرياض للأفراد والمكاتب، بداية من تجهيز القطع وفك الأثاث الذي يحتاج إلى فك، مروراً بالتغليف والنقل، وحتى إعادة التركيب في الموقع الجديد حسب الخدمة المطلوبة.",
    localNote: "نغطي أحياء الرياض المختلفة وننسق موعد النقل حسب موقع الاستلام والتسليم وحجم الأثاث، مع إمكانية تنفيذ الفك والتركيب والتغليف ضمن نفس الطلب.",
    areas: ["شمال الرياض", "شرق الرياض", "غرب الرياض", "جنوب الرياض", "وسط الرياض", "جميع أحياء الرياض"],
    faq: [
      { q: "هل خدمة نقل العفش متاحة في جميع أحياء الرياض؟", a: "نعم، نخدم مختلف أحياء الرياض ويتم تأكيد الموعد والتفاصيل عند التواصل." },
      { q: "هل يمكن طلب الفك والتركيب مع النقل؟", a: "نعم، يمكن طلب الفك والتركيب والتغليف مع خدمة النقل حسب نوع الأثاث واحتياج العميل." },
      { q: "كيف أحصل على عرض سعر؟", a: "تواصل عبر الهاتف أو واتساب أو نموذج طلب عرض السعر وأرسل تفاصيل الأثاث وموقعي النقل للحصول على تقدير مناسب." },
    ],
  },
  "al-kharj": {
    slug: "al-kharj",
    city: "الخرج",
    title: "نقل عفش بالخرج | نقل أثاث وفك وتركيب | مؤسسة لمس",
    description: "خدمة نقل عفش بالخرج مع فك وتركيب وتغليف الأثاث، ونقل بين الخرج والرياض حسب الطلب. تواصل مع مؤسسة لمس للحصول على عرض سعر.",
    intro: "نقدم خدمة نقل الأثاث في الخرج للانتقال بين المنازل أو المواقع المختلفة، مع إمكانية فك وتركيب الأثاث وتغليف القطع قبل النقل بما يناسب طبيعة كل طلب.",
    localNote: "كما يمكن تنسيق طلبات النقل بين الخرج والرياض، ويتم تحديد تفاصيل السيارة والفريق والخدمات المطلوبة بعد معرفة كمية الأثاث وموقعي الاستلام والتسليم.",
    areas: ["داخل الخرج", "من الخرج إلى الرياض", "من الرياض إلى الخرج", "الأحياء والمناطق المحيطة بالخرج"],
    faq: [
      { q: "هل تنقلون العفش داخل الخرج؟", a: "نعم، تتوفر خدمة النقل داخل الخرج وفق الموعد والتفاصيل المتفق عليها." },
      { q: "هل يوجد نقل بين الرياض والخرج؟", a: "يمكن تنسيق النقل بين الرياض والخرج حسب تفاصيل الطلب وتوفر الموعد." },
      { q: "هل التغليف متاح مع النقل؟", a: "نعم، يمكن إضافة التغليف والفك والتركيب إلى خدمة النقل عند الحاجة." },
    ],
  },
  "al-muzahimiyah": {
    slug: "al-muzahimiyah",
    city: "المزاحمية",
    title: "نقل عفش بالمزاحمية | فك وتركيب وتغليف | مؤسسة لمس",
    description: "خدمة نقل عفش بالمزاحمية مع فك وتركيب وتغليف الأثاث، وإمكانية النقل بين المزاحمية والرياض حسب الطلب. اطلب عرض سعر من مؤسسة لمس.",
    intro: "نوفر خدمة نقل الأثاث بالمزاحمية للمنازل والاستراحات والمكاتب حسب طبيعة الطلب، مع إمكانية تجهيز الأثاث وفكه وتغليفه ثم إعادة تركيبه في الموقع الجديد.",
    localNote: "يمكن أيضاً تنسيق النقل بين المزاحمية والرياض، ويحدد عرض السعر بعد معرفة حجم الأثاث والخدمات الإضافية المطلوبة وموقعي الاستلام والتسليم.",
    areas: ["داخل المزاحمية", "من المزاحمية إلى الرياض", "من الرياض إلى المزاحمية", "المناطق المحيطة بالمزاحمية"],
    faq: [
      { q: "هل الخدمة متاحة داخل المزاحمية؟", a: "نعم، يمكن حجز خدمة نقل الأثاث داخل المزاحمية حسب الموعد المتاح." },
      { q: "هل تنقلون الأثاث من المزاحمية إلى الرياض؟", a: "يمكن تنسيق النقل بين المزاحمية والرياض بعد معرفة تفاصيل الأثاث وموقعي النقل." },
      { q: "هل يمكن طلب فك وتركيب فقط؟", a: "تتوفر خدمات الفك والتركيب حسب نوع الأثاث وتفاصيل الطلب، ويمكن دمجها مع النقل والتغليف." },
    ],
  },
};

const LocationService = () => {
  const { slug } = useParams();
  const data = slug ? locations[slug] : undefined;
  const { settings: COMPANY } = useCompanySettings();

  if (!data) return <Navigate to="/service-areas" replace />;

  const canonical = `${SITE_URL}/areas/${data.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `نقل عفش ${data.city}`,
    "description": data.description,
    "url": canonical,
    "areaServed": { "@type": "City", "name": data.city },
    "provider": {
      "@type": "MovingCompany",
      "name": "مؤسسة لمس لنقل الأثاث",
      "url": SITE_URL,
      "telephone": COMPANY.phone,
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "مناطق الخدمة", item: `${SITE_URL}/service-areas` },
      { "@type": "ListItem", position: 3, name: data.city, item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:locale" content="ar_SA" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div>
        <section className="bg-navy-gradient text-white py-16 md:py-20">
          <div className="container max-w-5xl">
            <p className="text-secondary font-bold mb-3 flex items-center gap-2"><MapPin className="h-5 w-5" /> خدمة محلية في {data.city}</p>
            <h1 className="text-4xl md:text-5xl font-black mb-5">نقل عفش {data.city} مع الفك والتركيب والتغليف</h1>
            <p className="text-lg text-white/80 leading-8 max-w-3xl">{data.intro}</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground font-bold">
                <a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone"><Phone className="ml-2 h-5 w-5" /> اتصل الآن</a>
              </Button>
              <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1da851] text-white font-bold">
                <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" data-ads-conversion="whatsapp"><MessageCircle className="ml-2 h-5 w-5" /> واتساب</a>
              </Button>
            </div>
            <p className="text-xs text-white/65 mt-4">خدماتنا للنقل والفك والتركيب والتغليف فقط — لا نقوم بشراء أو بيع الأثاث المستعمل.</p>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container max-w-5xl grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black mb-4">خدمة نقل أثاث متكاملة في {data.city}</h2>
                <p className="text-muted-foreground leading-8">{data.localNote}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {["نقل الأثاث والعفش", "فك وتركيب الأثاث", "تغليف الأثاث", "تنسيق النقل حسب الموعد", "نقل المنازل", "نقل المكاتب"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border p-4"><CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" /><span className="font-medium">{item}</span></div>
                ))}
              </div>
              <div>
                <h2 className="text-2xl font-black mb-4">مناطق الخدمة</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {data.areas.map((area) => <Card key={area}><CardContent className="p-4 flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" /><span className="font-bold text-sm">{area}</span></CardContent></Card>)}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black mb-4">أسئلة شائعة عن نقل العفش في {data.city}</h2>
                <div className="space-y-3">
                  {data.faq.map((item) => <Card key={item.q}><CardContent className="p-5"><h3 className="font-bold mb-2">{item.q}</h3><p className="text-sm text-muted-foreground leading-7">{item.a}</p></CardContent></Card>)}
                </div>
              </div>
            </div>

            <aside>
              <Card className="sticky top-24">
                <CardContent className="p-5 space-y-4">
                  <h2 className="text-xl font-black">اطلب عرض سعر</h2>
                  <p className="text-sm text-muted-foreground">أرسل تفاصيل موقع الاستلام والتسليم ونوع الأثاث والخدمات المطلوبة.</p>
                  <Button asChild className="w-full"><Link to="/get-quote" data-lead-action="get_quote">طلب عرض سعر <ArrowLeft className="mr-2 h-4 w-4" /></Link></Button>
                  <Button asChild variant="outline" className="w-full"><a href={`tel:${COMPANY.phone}`} data-ads-conversion="phone">{COMPANY.phone}</a></Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
        {data.slug === "riyadh" && (
          <RelatedSeoLinks title="خدمة نقل العفش في أحياء الرياض" links={FEATURED_NEIGHBORHOOD_LINKS.slice(0, 6)} variant="area" />
        )}
        <RelatedSeoLinks
          title="أدلة تساعدك قبل النقل"
          links={[
            { label: "أسعار نقل العفش بالرياض", href: "/guides/furniture-moving-prices-riyadh" },
            { label: "كيف تختار شركة نقل عفش؟", href: "/guides/choose-moving-company-riyadh" },
            { label: "قائمة تجهيز المنزل", href: "/guides/moving-checklist-riyadh" },
          ]}
        />
      </div>
    </>
  );
};

export default LocationService;
