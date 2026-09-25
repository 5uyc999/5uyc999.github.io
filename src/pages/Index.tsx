import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle2, MapPin, MessageCircle, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { LOCAL_BUSINESS_LD, WEBSITE_LD } from "@/lib/seo";

const quickServices = [
  {
    title: "نقل عفش بالرياض",
    description: "نقل أثاث الشقق والفلل والمكاتب داخل الرياض بسيارات مجهزة.",
    href: "/services/moving-inside-riyadh",
    icon: Truck,
  },
  {
    title: "فك وتركيب الأثاث",
    description: "فك وتركيب غرف النوم والدواليب والأثاث بواسطة فنيين متخصصين.",
    href: "/services/assembly-disassembly",
    icon: Wrench,
  },
  {
    title: "نقل عفش الخرج",
    description: "خدمة نقل أثاث بين الرياض والخرج مع الفك والتركيب عند الطلب.",
    href: "/areas/al-kharj",
    icon: MapPin,
  },
];

const Index = () => {
  const { settings: COMPANY } = useCompanySettings();
  const whatsappDisplay = `0${String(COMPANY.whatsapp).replace(/^966/, "")}`;

  return (
    <>
      <Helmet>
        <title>نقل عفش بالرياض | فك وتركيب وتغليف - مؤسسة لمس</title>
        <meta
          name="description"
          content="نقل عفش بالرياض مع الفك والتركيب والتغليف للشقق والفلل والمكاتب. خدمة نقل فقط ولا نشتري أو نبيع الأثاث. اتصل أو تواصل واتساب الآن."
        />
        <meta
          name="keywords"
          content="نقل عفش بالرياض, نقل اثاث بالرياض, شركة نقل عفش بالرياض, فك وتركيب اثاث, نقل عفش الخرج, مؤسسة لمس"
        />
        <link rel="canonical" href="https://lmmssa.github.io/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lmmssa.github.io/" />
        <meta property="og:title" content="نقل عفش بالرياض | مؤسسة لمس" />
        <meta
          property="og:description"
          content="نقل أثاث بالرياض مع الفك والتركيب والتغليف. اتصل أو تواصل واتساب للحصول على عرض سعر."
        />
        <meta property="og:image" content="https://lmmssa.github.io/og-image.jpg" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(LOCAL_BUSINESS_LD)}</script>
        <script type="application/ld+json">{JSON.stringify(WEBSITE_LD)}</script>
      </Helmet>

      <div className="bg-background">
        {/* Conversion-first hero: text only for faster LCP and clearer intent. */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
          <div className="container relative py-8 sm:py-10 md:py-14">
            <div className="max-w-4xl mx-auto text-center">

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                نقل عفش بالرياض
                <span className="block text-secondary mt-2">فك وتركيب وتغليف بأمان</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg md:text-xl text-primary-foreground/90 leading-8 max-w-3xl mx-auto">
                للشقق والفلل والمكاتب داخل الرياض والخرج والمزاحمية. تواصل مباشرة للحصول على عرض سعر مناسب لخدمتك.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-background/10 border border-primary-foreground/15 px-4 py-2 text-sm sm:text-base font-bold">
                <ShieldCheck className="h-5 w-5 text-secondary" />
                خدمة نقل وفك وتركيب فقط — لا نشتري أو نبيع الأثاث المستعمل
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <Button
                  asChild
                  size="lg"
                  className="h-14 sm:h-16 rounded-2xl bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground text-lg sm:text-xl font-black shadow-lg"
                >
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ads-conversion="whatsapp"
                    aria-label={`واتساب ${whatsappDisplay}`}
                  >
                    <MessageCircle className="ml-2 h-6 w-6" />
                    واتساب الآن
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  className="h-14 sm:h-16 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg sm:text-xl font-black shadow-lg"
                >
                  <a
                    href={`tel:${COMPANY.phone}`}
                    data-ads-conversion="phone"
                    aria-label={`اتصل الآن ${COMPANY.phone}`}
                  >
                    <Phone className="ml-2 h-6 w-6" />
                    اتصل الآن
                  </a>
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-primary-foreground/85">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  فريق مدرب
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  سيارات مجهزة
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  فك وتركيب
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  الرياض والخرج والمزاحمية
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Only the three high-intent services used by the ads. */}
        <section className="py-8 sm:py-10" aria-labelledby="quick-services-title">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 id="quick-services-title" className="text-2xl sm:text-3xl font-black text-foreground">
                اختر الخدمة المطلوبة
              </h2>
              <p className="text-muted-foreground mt-2">صفحات مباشرة ومخصصة حسب نوع الخدمة.</p>
            </div>

            <div className="grid gap-3 md:grid-cols-3 max-w-5xl mx-auto">
              {quickServices.map(({ title, description, href, icon: Icon }) => (
                <Link
                  key={title}
                  to={href}
                  className="rounded-2xl border border-border bg-card p-5 hover:border-secondary hover:shadow-md transition-all"
                >
                  <Icon className="h-8 w-8 text-secondary mb-3" />
                  <h3 className="text-lg font-black mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-6">{description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Lightweight trust/relevance block: no network requests or heavy media. */}
        <section className="border-y border-border bg-muted/35 py-7 sm:py-9">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto text-center">
              <div className="rounded-xl bg-background border border-border p-4">
                <Truck className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="font-black">نقل أثاث</p>
              </div>
              <div className="rounded-xl bg-background border border-border p-4">
                <Wrench className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="font-black">فك وتركيب</p>
              </div>
              <div className="rounded-xl bg-background border border-border p-4">
                <ShieldCheck className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="font-black">تغليف وحماية</p>
              </div>
              <div className="rounded-xl bg-background border border-border p-4">
                <MapPin className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="font-black">الرياض والخرج</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final conversion block. */}
        <section className="py-9 sm:py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto rounded-3xl bg-primary p-6 sm:p-8 text-center text-primary-foreground shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-black">تحتاج نقل عفش الآن؟</h2>
              <p className="mt-2 text-primary-foreground/85">اتصل مباشرة أو أرسل واتساب للحصول على عرض سعر.</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ads-conversion="whatsapp"
                  className="h-14 rounded-2xl bg-whatsapp text-whatsapp-foreground font-black flex items-center justify-center gap-2 text-lg"
                >
                  <MessageCircle className="h-6 w-6" /> واتساب
                </a>
                <a
                  href={`tel:${COMPANY.phone}`}
                  data-ads-conversion="phone"
                  className="h-14 rounded-2xl bg-secondary text-secondary-foreground font-black flex items-center justify-center gap-2 text-lg"
                >
                  <Phone className="h-6 w-6" /> اتصال مباشر
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
