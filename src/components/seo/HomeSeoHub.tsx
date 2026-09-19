import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, MapPin, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const links = [
  { title: "دليل نقل العفش بالرياض", desc: "الأسعار والتجهيز والتغليف والفك والتركيب في مكان واحد.", href: "/moving-guide", icon: BookOpen },
  { title: "نقل عفش بالرياض", desc: "خدمة نقل الأثاث داخل أحياء الرياض.", href: "/areas/riyadh", icon: Truck },
  { title: "تغليف اثاث بالرياض", desc: "حماية الزجاج والمرايا وغرف النوم والأجهزة قبل النقل.", href: "/services/packing", icon: Truck },
  { title: "نقل مكاتب بالرياض", desc: "نقل الأثاث المكتبي والأجهزة والأرشيف بخطة منظمة.", href: "/services/office-moving", icon: Truck },
  { title: "أسعار نقل العفش", desc: "تعرف على العوامل التي تحدد تكلفة النقل.", href: "/guides/furniture-moving-prices-riyadh", icon: BookOpen },
  { title: "أحياء الرياض", desc: "صفحات خدمة مفصلة لأحياء مختارة داخل الرياض.", href: "/service-areas#riyadh-neighborhoods", icon: MapPin },
  { title: "دينا نقل عفش بالرياض", desc: "للشقق والقطع والنقلات التي تحتاج سيارة مناسبة داخل المدينة.", href: "/services/dyna-moving-riyadh", icon: Truck },
  { title: "مناطق الرياض", desc: "شمال وشرق وغرب وجنوب ووسط الرياض بصفحات مخصصة.", href: "/service-areas", icon: MapPin },
];

const HomeSeoHub = () => (
  <section className="py-14 md:py-20 bg-muted/40" aria-labelledby="seo-hub-title">
    <div className="container">
      <div className="max-w-3xl mb-8">
        <p className="text-secondary font-bold mb-2">دليل مؤسسة لمس</p>
        <h2 id="seo-hub-title" className="text-3xl md:text-4xl font-black mb-3">كل ما تحتاجه قبل نقل الأثاث بالرياض</h2>
        <p className="text-muted-foreground leading-8">نعمل داخل الرياض وخارجها في نقل عفش الشقق والفلل والمكاتب، مع الفك والتركيب وتغليف الأثاث. هذه صفحات عملية تساعدك في التخطيط للنقل، فهم السعر، تجهيز الأثاث واختيار الخدمة المناسبة لموقعك.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map(({ title, desc, href, icon: Icon }) => (
          <Link key={href} to={href} className="block h-full">
            <Card className="h-full hover:border-secondary hover:shadow-md transition-all">
              <CardContent className="p-5">
                <Icon className="h-7 w-7 text-secondary mb-4" />
                <h3 className="font-black text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-6">{desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary mt-4">عرض التفاصيل <ArrowLeft className="h-4 w-4" /></span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default HomeSeoHub;
