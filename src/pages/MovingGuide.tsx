import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, MapPin, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURED_GUIDE_LINKS, FEATURED_NEIGHBORHOOD_LINKS } from "@/lib/seoClusters";
import { SERVICES } from "@/lib/constants";

const SITE_URL = "https://lams.sooftit.com";

const MovingGuide = () => (
  <>
    <Helmet>
      <title>دليل نقل العفش بالرياض | الأسعار والتغليف والفك والتركيب | مؤسسة لمس</title>
      <meta name="description" content="دليل شامل لنقل العفش بالرياض: فهم الأسعار، تجهيز المنزل، التغليف، الفك والتركيب، نقل المكاتب، التخزين ومناطق الخدمة داخل الرياض." />
      <link rel="canonical" href={`${SITE_URL}/moving-guide`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/moving-guide`} />
      <meta property="og:title" content="دليل نقل العفش بالرياض | مؤسسة لمس" />
      <meta property="og:description" content="أدلة عملية وخدمات ومناطق لمساعدتك على التخطيط لنقل الأثاث داخل الرياض." />
      <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "دليل نقل العفش بالرياض",
        description: "أدلة وخدمات ومناطق متعلقة بنقل الأثاث بالرياض",
        url: `${SITE_URL}/moving-guide`,
        inLanguage: "ar-SA",
        isPartOf: { "@type": "WebSite", name: "مؤسسة لمس لنقل الأثاث", url: SITE_URL },
      })}</script>
    </Helmet>

    <div>
      <section className="bg-navy-gradient text-white py-16 md:py-20">
        <div className="container max-w-6xl">
          <p className="text-secondary font-bold mb-3">مركز المحتوى</p>
          <h1 className="text-4xl md:text-5xl font-black mb-5">دليل نقل العفش بالرياض</h1>
          <p className="text-lg text-white/80 leading-8 max-w-3xl">اختر ما تحتاجه: فهم السعر، تجهيز المنزل، حماية الأثاث، اختيار الخدمة المناسبة أو الوصول إلى صفحة منطقتك داخل الرياض.</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container max-w-6xl">
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6"><BookOpen className="h-6 w-6 text-secondary" /><h2 className="text-3xl font-black">أدلة تساعدك قبل النقل</h2></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURED_GUIDE_LINKS.map((item) => (
                <Link key={item.href} to={item.href} className="block h-full">
                  <Card className="h-full hover:border-secondary hover:shadow-md transition-all"><CardContent className="p-5"><h3 className="font-black text-lg mb-2">{item.label}</h3><p className="text-sm text-muted-foreground leading-6">{item.description}</p><span className="inline-flex items-center gap-1 text-sm font-bold text-primary mt-4">قراءة الدليل <ArrowLeft className="h-4 w-4" /></span></CardContent></Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6"><Truck className="h-6 w-6 text-secondary" /><h2 className="text-3xl font-black">خدمات نقل الأثاث</h2></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((service) => <Link key={service.id} to={service.slug}><Card className="h-full hover:border-secondary transition-colors"><CardContent className="p-5"><h3 className="font-black mb-2">{service.title}</h3><p className="text-sm text-muted-foreground leading-6">{service.shortDesc}</p></CardContent></Card></Link>)}
            </div>
          </div>

          <div id="riyadh-neighborhoods">
            <div className="flex items-center gap-2 mb-6"><MapPin className="h-6 w-6 text-secondary" /><h2 className="text-3xl font-black">أحياء الرياض</h2></div>
            <p className="text-muted-foreground mb-5">صفحات تفصيلية لعدد من الأحياء الأكثر طلباً، مع روابط مباشرة للخدمات والأدلة المناسبة.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {FEATURED_NEIGHBORHOOD_LINKS.map((item) => <Link key={item.href} to={item.href} className="rounded-xl border p-4 font-bold hover:border-secondary hover:text-secondary transition-colors">{item.label}</Link>)}
            </div>
            <div className="mt-5"><Link to="/service-areas" className="inline-flex items-center gap-1 font-bold text-primary hover:text-secondary">عرض جميع مناطق الخدمة <ArrowLeft className="h-4 w-4" /></Link></div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default MovingGuide;
