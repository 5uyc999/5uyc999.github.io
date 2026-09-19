import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Truck, MapPin, Wrench, Package, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = { Truck, MapPin, Wrench, Package };

const Services = () => {
  return (
    <>
      <Helmet>
        <title>خدمات نقل الأثاث بالرياض | فك وتركيب وتغليف | مؤسسة لمس</title>
        <meta name="description" content="خدمات نقل أثاث احترافية بالرياض: نقل شقق وفلل، نقل داخلي وخارجي، فك وتركيب، تغليف، نقل مكاتب وتخزين أثاث. احصل على عرض سعر حسب احتياجك." />
        <meta name="keywords" content="خدمات نقل أثاث, نقل عفش داخل الرياض, نقل شقق بالرياض, نقل فلل بالرياض, نقل عفش خارج الرياض, فك وتركيب أثاث, تغليف أثاث, نقل مكاتب بالرياض, تخزين أثاث بالرياض" />
        <link rel="canonical" href="https://lams.sooftit.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lams.sooftit.com/services" />
        <meta property="og:title" content="خدمات نقل الأثاث بالرياض | فك وتركيب وتغليف | مؤسسة لمس" />
        <meta property="og:description" content="خدمات نقل أثاث احترافية بالرياض: نقل داخلي وخارجي، فك وتركيب، تغليف، نقل مكاتب. عرض سعر مجاني." />
        <meta property="og:image" content="https://lams.sooftit.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="مؤسسة لمس لنقل الأثاث" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="خدمات نقل الأثاث بالرياض | مؤسسة لمس" />
        <meta name="twitter:description" content="خدمات نقل أثاث احترافية بالرياض: نقل داخلي وخارجي، فك وتركيب، تغليف، نقل مكاتب." />
        <meta name="twitter:image" content="https://lams.sooftit.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://lams.sooftit.com/" },
            { "@type": "ListItem", "position": 2, "name": "خدماتنا", "item": "https://lams.sooftit.com/services" }
          ]
        })}</script>
      </Helmet>
      <div>
      <section className="bg-navy-gradient text-white py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4">خدماتنا</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              نقدم مجموعة شاملة من خدمات نقل الأثاث الاحترافية لتلبية جميع احتياجاتك داخل وخارج الرياض
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Truck;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="group hover:shadow-gold transition-all h-full border-border hover:border-secondary">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                      </div>
                      <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">{service.shortDesc}</p>
                      <Button asChild variant="outline" className="font-bold">
                        <Link to={service.slug}>
                          تفاصيل الخدمة <ArrowLeft className="mr-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Services;
