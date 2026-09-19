import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

interface Props {
  testimonials: Array<{ name: string; text: string; rating: number; city: string | null }>;
}

const TestimonialsSection = ({ testimonials }: Props) => (
  <section className="py-20 bg-background">
    <div className="container">
      <SectionHeading title="ماذا يقول عملاؤنا" subtitle="نفخر بثقة عملائنا وتقييماتهم الإيجابية لخدماتنا المتميزة" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Card className="h-full hover:shadow-gold transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className={`h-4 w-4 ${si < t.rating ? "text-secondary fill-secondary" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">"{t.text}"</p>
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="outline" className="font-bold">
          <Link to="/testimonials">عرض جميع التقييمات <ChevronLeft className="mr-1 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
