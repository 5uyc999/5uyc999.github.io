import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SeoLink } from "@/lib/seoClusters";

type Props = {
  title?: string;
  links: SeoLink[];
  variant?: "guide" | "area";
};

const RelatedSeoLinks = ({ title = "روابط مفيدة", links, variant = "guide" }: Props) => {
  if (!links.length) return null;
  const Icon = variant === "area" ? MapPin : BookOpen;

  return (
    <section className="py-12 border-t border-border">
      <div className="container max-w-6xl">
        <h2 className="text-2xl font-black mb-5">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((item) => (
            <Link key={item.href} to={item.href} className="block h-full">
              <Card className="h-full hover:border-secondary hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-secondary shrink-0 mt-1" />
                    <div className="min-w-0">
                      <h3 className="font-black mb-1">{item.label}</h3>
                      {item.description && <p className="text-sm text-muted-foreground leading-6">{item.description}</p>}
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-primary mt-3">اعرف أكثر <ArrowLeft className="h-4 w-4" /></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedSeoLinks;
