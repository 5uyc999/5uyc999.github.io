import { Link } from "react-router-dom";
import {
  Shield, Clock, BadgeDollarSign, Users, ThumbsUp,
  Headphones, Truck, MapPin, Wrench, Package, ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import { SERVICES } from "@/lib/constants";
import servicesOverview from "@/assets/services-overview.webp";

const iconMap: Record<string, React.ElementType> = {
  Shield, Clock, BadgeDollarSign, Users, ThumbsUp,
  HeadphonesIcon: Headphones, Truck, MapPin, Wrench, Package,
};

const ServicesSection = () => (
  <section className="py-20 bg-background" id="services">
    <div className="container">
      <SectionHeading
        title="خدماتنا المتميزة"
        subtitle="نقدم مجموعة شاملة من خدمات نقل الأثاث لتلبية جميع احتياجاتك بأعلى مستويات الجودة والاحترافية"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {SERVICES.map((service) => {
          const Icon = iconMap[service.icon] || Truck;
          return (
            <Card key={service.id} className="group hover:shadow-gold transition-all duration-300 border-border hover:border-secondary h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.shortDesc}</p>
                <Link to={service.slug} className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary transition-colors">
                  المزيد <ArrowLeft className="mr-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-12 overflow-hidden rounded-2xl border border-border shadow-lg bg-muted">
        <img src={servicesOverview} alt="خدمات مؤسسة لمس - فك وتركيب - تغليف احترافي - نقل أثاث داخل وخارج الرياض" loading="lazy" decoding="async" width={1677} height={938} className="w-full h-auto object-contain" />
      </div>
    </div>
  </section>
);

export default ServicesSection;
