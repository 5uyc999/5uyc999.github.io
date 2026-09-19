import { Shield, Clock, BadgeDollarSign, Users, ThumbsUp, Headphones, Truck, MapPin, Wrench, Package } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Shield, Clock, BadgeDollarSign, Users, ThumbsUp,
  HeadphonesIcon: Headphones, Truck, MapPin, Wrench, Package,
};

const FeaturesSection = () => (
  <section className="py-20 bg-navy-gradient text-white">
    <div className="container">
      <SectionHeading title="لماذا تختار مؤسسة لمس؟" subtitle="نتميز عن غيرنا بمجموعة من المزايا التي تجعلنا الخيار الأول لعملائنا في الرياض" light />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => {
          const Icon = iconMap[feature.icon] || Shield;
          return (
            <div key={feature.title} className="flex gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Icon className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
